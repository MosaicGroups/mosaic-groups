var User = require('mongoose').model('User'),
  encrypt = require('../utilities/encryption'),
  emailer = require('../utilities/emailer');

exports.getUsers = function(req, res) {
  console.log("getUsers")
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getUser = function(req, res) {
  console.log("getUser")
  var userId = req.params.id;
  if (userId) {
    console.log("finding one user")
    User.findOne({_id: userId}).exec(function(err, user) {
      res.send(user);
    });
  }
};

exports.saveUser = function(req, res, next) {
  console.log("saveUser")
  var userData = req.body;
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

  // only current admins can create new admins
  if (!req.user || !req.user.hasRole('admin')) {
    if (userData.roles && userData.roles.indexOf('admin') >= 0) {
      res.status(403);
      return res.send("You cannot create an 'admin' user");
    }
  }

  // only current superadmins can create superadmins
  if (!req.user || !req.user.hasRole('superadmin')) {
    if (userData.roles && userData.roles.indexOf('superadmin') >= 0) {
      res.status(403);
      return res.send("You cannot create a 'superadmin' user");
    }
  }

  User.create(userData, function(err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('There is already a user with that name in the system.  Please choose a different name.');
      }
      res.status(400);
      res.send({reason:err.toString()});
    } else {
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
  console.log("updateUser");

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
    userUpdates.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password);
  }
  User.findByIdAndUpdate(userId, userUpdates, undefined, function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    if (req.user._id === userId) {
      // if updating self then set self to the newly updated user object
      req.user = userUpdates;
    }
    userUpdates._id = userId;
    emailer.sendAuditMessageEMail("User: " + userUpdates.username + " was updated by: " + req.user.username);
    res.send(userUpdates);
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
    User.findById(userDeleteId).exec(function(err, collection) {
      var userToDelete = collection;

      // if not found then return 404
      if(err) {
        res.status(404);
        return res.send({reason: err.toString()});
      }
      // if the user is a superadmin then they cannot be deleted
      else if (userToDelete.hasRole('superadmin')) {
        res.status(403);
        return res.send({reason: 'superadmin users cannot be deleted'});
      }
      // if found then delete
      else {
        userToDelete.remove(function(err) {
          if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
          }
          emailer.sendAuditMessageEMail("User: " + userToDelete.username + " was deleted by: " + req.user.username);
          return res.end();
        });
      }
    });
  }
}