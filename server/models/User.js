var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
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
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
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