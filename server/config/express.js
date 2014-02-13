var express = require('express'),
    stylus = require('stylus');

module.exports = function(app, config) {
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(stylus.middleware(
      {
        src: config.rootPath + '/public',
        compile: compile
      }
    ));
    // ensure that all public requests go to the /public directory
    app.use(express.static(config.rootPath + '/public'));
  });
}