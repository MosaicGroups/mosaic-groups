var User = require('mongoose').model('User'),
  encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.createUser = function(req, res, next) {
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
  var userUpdates = req.body;

  if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }
  req.user.save(function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    res.send(req.user);
  });
};

exports.deleteUser = function(req, res) {
  // get the user object from the request body that is to be deleted
  var userDeleteId = req.query._id;

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
    userDelete = User.findById(userDeleteId).exec(function(err, collection) {
      // if not found then return 404
      if(err) { res.status(404); return res.send({reason:err.toString()});}
      // if found then delete
      collection.remove(function(err) {
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        return res.end();
      });
    });
  }
}