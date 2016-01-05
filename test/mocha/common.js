process.env.NODE_ENV = 'test';

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
mockgoose(mongoose);
var app = require('../../server');

console.warn("ISMOCKED", mongoose.isMocked);

exports.app = app;
