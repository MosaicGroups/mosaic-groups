let express = require('express');
let passport = require('passport');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieSession = require('cookie-session');
let config = require('./config');

let forceSsl = function (req, res, next) {
    if (config.env === 'production' && !req.secure) {
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