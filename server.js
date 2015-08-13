var express = require('express');
var https = require('https');
var http = require('http');
var config = require('./server/config/config');

var app = express();

console.log('configuring express');
require('./server/config/express')(app);

console.log('configuring mongoose');
require('./server/config/mongoose')();

console.log('configuring passport');
require('./server/config/passport')();

console.log('configuring routes');
require('./server/config/routes')(app);

console.log('configuring scheduler');
require('./server/config/scheduler')();

console.log('configuring listener for http on port: ' + config.http.port);
http.createServer(app).listen(config.http.port);

if (config.env === 'development') {
    console.log('configuring listener for https on port: ' + config.https.port);
    https.createServer(config.https.options, app).listen(config.https.port);
}

console.log("Listening on port " + config.http.port);