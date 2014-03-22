var mongoose = require('mongoose'),
  userModel = require('../models/User')
  groupModel = require('../models/Group');

module.exports = function(env, config) {
  mongoose.set('debug', true)
  console.log("connecting to '" + env + "' mongo instance");
  mongoose.connect(config.db)
  console.log("connected...");

  var db = mongoose.connection;
  db.on('error',
    function(err) {
      console.error('connection error: %s', err);
    }
  );
  db.once('open', function callback() {
    console.log('mosaicgroups db opened');
  });

  userModel.createDefaultUsers();
};