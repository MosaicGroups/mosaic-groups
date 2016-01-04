var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

//mongoose schema for User collection
var userSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required:'{PATH} is required!'},
  lastName: {
    type:String,
    required:'{PATH} is required!'},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique:true},
  salt: {
    type:String,
    required:'{PATH} is required!'},
  hashed_pwd: {
    type:String,
    required:'{PATH} is required!'},
  roles: [String]
});

userSchema.methods = {
  // user authentication
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  // determine if a user is in a given role
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  },
  // remove the hashed_pwd and salt from all objects that are returned
  toJSON: function() {
    var obj = this.toObject();
    delete obj.hashed_pwd;
    delete obj.salt;
    return obj
  }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      console.log("creating default users");
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'p');
      User.create({firstName:'Pat',lastName:'Blair',username:'pblair12@gmail.com', salt: salt, hashed_pwd: hash, roles: ['admin', 'superadmin']});
    } else {
      console.log("not creating default users because %s users already exist", collection.length);
    }
  })
};

exports.createDefaultUsers = createDefaultUsers;