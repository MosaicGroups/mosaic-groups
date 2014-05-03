var express = require('express');
var https = require('https');
var http = require('http');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var app = express();

var config = require('./server/config/config')[env];

console.log('configuring express');
require('./server/config/express')(app, config);

console.log('configuring mongoose');
require('./server/config/mongoose')(env, config);

console.log('configuring passport');
require('./server/config/passport')();

console.log('configuring routes');
require('./server/config/routes')(app, config);

console.log('configuring scheduler');
require('./server/config/scheduler')(config);

console.log('configuring listener');
http.createServer(app).listen(config.http.port);
https.createServer(config.https.options, app).listen(config.https.port);
console.log("Listening on port " + config.port + "...");