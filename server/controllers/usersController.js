var User = require('mongoose').model('User'),
  encrypt = require('../utilities/encryption'),
  emailer = require('../utilities/emailer'),
  errorHandler = require('../utilities/errorHandler');

exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getUser = function(req, res) {
  var userId = req.params.id;
  if (userId) {
    User.findOne({_id: userId}).exec(function(err, user) {
      res.send(user);
    });
  }
};

exports.saveUser = function(req, res, next) {
  var userData = req.body;
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

  // only current admins can create new admins
  if (userData.roles && userData.roles.indexOf('admin') >= 0) {
    if (!req.user || !req.user.hasRole('admin')) {
      errorHandler.sendError(req, res, err, 403);
    }
  }

  // only current superadmins can create superadmins
  if (userData.roles && userData.roles.indexOf('superadmin') >= 0) {
    if (!req.user || !req.user.hasRole('superadmin')) {
      errorHandler.sendError(req, res, err, 403);
    }
  }

  // create the user
  User.create(userData, function(err, user) {
    if(err) { errorHandler.sendError(req, res, err); }
    else {
      // if this request to create a user was not made by a current user then log the new user in
      if (!req.user) {
        req.user = user;
        emailer.sendAuditMessageEMail("User: " + user.username + " was created");
        next();
      }
      // otherwise keep the current user logged in and return success
      else {
        emailer.sendAuditMessageEMail("User: " + user.username + " was created by " + req.user.username);
        res.send(user);
      }
    }
  })
};

exports.updateUser = function(req, res) {
  var userUpdates = req.body;
  var userId = userUpdates._id;
  delete userUpdates["_id"];

  // if not updating self or if this is an not admin user
  if(req.user._id != userId && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  if(userUpdates.password && userUpdates.password.length > 0) {
    userUpdates.salt = encrypt.createSalt();
    userUpdates.hashed_pwd = encrypt.hashPwd(userUpdates.salt, userUpdates.password);
  }
  User.findByIdAndUpdate(userId, userUpdates, undefined, function(err) {
    if(err) { errorHandler.sendError(req, res, err); }
    else {
      if (req.user._id === userId) {
        // if updating self then set self to the newly updated user object
        req.user = userUpdates;
      }
      userUpdates._id = userId;
      emailer.sendAuditMessageEMail("User: " + userUpdates.username + " was updated by: " + req.user.username);
      res.send(userUpdates);
    }
  });
};

exports.deleteUser = function(req, res) {
  // get the user object from the request body that is to be deleted
  var userDeleteId = req.params.id;

  // only admins can delete users
  if(!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  // if there was no user object in the request then return bad request
  else if (userDeleteId === undefined) {
    res.status(400);
    return res.end();
  }
  // otherwise, get the user from the database then delete them
  else {
    User.findById(userDeleteId).exec(function(err, data) {
      if(err) { errorHandler.sendError(req, res, err, 404); }
      else {
        var userToDelete = data;
        // if the user is a superadmin then they cannot be deleted
        if (!req.user.hasRole('superadmin') && userToDelete.hasRole('superadmin')) {
          res.status(403);
          return res.send({reason: 'superadmin users can only be deleted by other superadmin users'});
        }
        // if found then delete
        else {
          userToDelete.remove(function(err) {
            if(err) { errorHandler.sendError(req, res, err); }
            emailer.sendAuditMessageEMail("User: " + userToDelete.username + " was deleted by: " + req.user.username);
            return res.end();
          });
        }
      }
    });
  }
}