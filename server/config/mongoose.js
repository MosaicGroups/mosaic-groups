var mongoose = require('mongoose'),
  userModel = require('../models/User')
  groupModel = require('../models/Group'),
  settingsModel = require('../models/Settings');

module.exports = function(env, config) {
  mongoose.set('debug', config.db.debugMode)
  console.log("connecting to '" + env + "' mongo instance");
  mongoose.connect(config.db.url)
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

  // create default users on server start if users are empty
  userModel.createDefaultUsers();
  // create default settings on server start if settings are empty
  settingsModel.createDefaultSettings();
};