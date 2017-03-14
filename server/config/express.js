var express = require('express');
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var config = require('./config');
var logger = require('./logger');

var forceSsl = function (req, res, next) {
  logger.log("req.headers['x-forwarded-proto'] = " + req.headers['x-forwarded-proto']);
  if (config.env === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    logger.log("req.headers['x-forwarded-proto'] = " + req.headers['x-forwarded-proto']);
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

module.exports = function (app) {
  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  if (config.env !== 'test') {
    app.use(morgan('combined'));
  }
  app.use(forceSsl);
  app.use(bodyParser());
  app.use(cookieSession({secret: 'mosaic groups unicorns'}));
  app.use(passport.initialize());
  app.use(passport.session());

  // ensure that all public requests go to the /public directory
  app.use(express.static(config.rootPath + '/public'));
};