var logger = require('./logger');
var mongoose = require('mongoose');
var userModel = require('../models/User');
var groupModel = require('../models/Group');
var settingsModel = require('../models/Settings');
var config = require('./config');

module.exports = function () {
    if (process.env.NODE_ENV !== 'test') {
        mongoose.set('debug', config.db.debugMode);
    }

    //setting own Promise library. See: http://mongoosejs.com/docs/promises.html    
    mongoose.Promise = Promise;

    logger.log('connecting to ' + config.env + ' mongo instance');
    mongoose.connect(config.db.url);
    logger.log('connected...');

    var db = mongoose.connection;
    db.on('error',
        function (err) {
            logger.error('connection error: %s', err);
        });
    db.once('open', function callback() {
        logger.log('mosaicgroups db opened');
    });

    // create default users on server start if users are empty
    userModel.createDefaultUsers();
    // create default settings on server start if settings are empty
    settingsModel.createDefaultSettings();
};