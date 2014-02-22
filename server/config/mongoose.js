var mongoose = require('mongoose'),
  userModel = require('../models/User')
  groupModel = require('../models/Group');

module.exports = function(env, config) {
  console.log("connecting to '" + env + "' mongo instance");
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('mosaicgroups db opened');
  });

  userModel.createDefaultUsers();
};