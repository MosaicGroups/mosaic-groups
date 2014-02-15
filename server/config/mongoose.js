var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(env, config) {
  console.log("connecting to '" + env + "' mongo instance");
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('mosaicgroups db opened');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length == 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'pblair12@gmail.com');
      User.create({firstName: "Patrick", lastName: "Blair", username: "pblair12@gmail.com", salt: salt, hashed_pwd: hash, roles: ['admin']});
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'jonathan@mosaicchristian.org');
      User.create({firstName: "Jonathan", lastName: "Moynihan", username: "jonathan@mosaicchristian.org", salt: salt, hashed_pwd: hash, roles: ['admin']})
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'shawn.p.wallis@gmail.com');
      User.create({firstName: "Shawn", lastName: "Wallis", username: "shawn.p.wallis@gmail.com", salt: salt, hashed_pwd: hash, roles: ['admin']})
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'groupleader');
      User.create({firstName: "Group", lastName: "Leader", username: "groupleader", salt: salt, hashed_pwd: hash, roles: ['groupleader']})
    }
  });
}

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}