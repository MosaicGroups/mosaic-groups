let express = require('express');
let passport = require('passport');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieSession = require('cookie-session');
let cors = require('cors');
let config = require('./config');
let logger = require('./logger');

var forceSsl = function (req, res, next) {
    logger.log("req.headers['x-forwarded-proto'] = " + req.headers['x-forwarded-proto']);
    if (config.env === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        logger.log("req.headers['x-forwarded-proto'] = " + req.headers['x-forwarded-proto']);
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
};

module.exports = function (app) {
    app.set('view engine', 'jade');
    if (config.env !== 'test') {
        let requestLogFormat = '\x1b[34mRequest:\x1b[0m [:date[iso]](:remote-addr): ":method :url HTTP/:http-version" :status :res[content-length]';
        app.use(morgan(requestLogFormat));
    }
    app.use(forceSsl);
    app.use(bodyParser());
    app.use(cookieSession({ secret: 'mosaic groups unicorns' }));
    app.use(passport.initialize());
    app.use(passport.session());

    if (config.env === 'production') {
        // app.use(cors({origin: 'http://mosaicchristian-org.s3-website-us-east-1.amazonaws.com'}));
        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://mosaicchristian-org.s3-website-us-east-1.amazonaws.com');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
    } else {
        app.set('views', config.rootPath + '/server/views');

        // ensure that all public requests go to the /public directory
        app.use(express.static(config.rootPath + '/public'));
    }
};