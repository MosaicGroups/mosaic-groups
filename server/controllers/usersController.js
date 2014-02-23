var User = require('mongoose').model('User'),
  encrypt = require('../utilities/encryption');

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

  User.create(userData, function(err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(user);
  })
};

exports.updateUser = function(req, res) {
  console.log("updateUser")
  var userUpdates = req.body;

  // if not updating self or if this is an not admin user
  if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  var user = {
    firstName: userUpdates.firstName,
    lastName: userUpdates.lastName,
    username: userUpdates.username,
    roles: userUpdates.roles
  }
  if(userUpdates.password && userUpdates.password.length > 0) {
    user.salt = encrypt.createSalt();
    user.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password);
  }
  User.findByIdAndUpdate(userUpdates._id, user, undefined, function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    if (req.user._id == user._id) {
      // if updating self then set self to the newly updated user object
      req.user = user;
    }
    res.send(user);
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
          return res.end();
        });
      }
    });
  }
}