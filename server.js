var express = require('express'),
    stylus = require('stylus');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(stylus.middleware(
    {
      src: __dirname + '/public',
      compile: compile
    }
  ));
  // ensure that all public requests go to the /public directory
  app.use(express.static(__dirname + '/public'));
});

app.get('/partials/*', function(req, res) {
  res.sendfile(__dirname + '/server/views' + req.path);
});

// ensure that the client side application does ALL of the routing
app.get('*', function(req, res) {
  res.sendfile(__dirname + '/server/views/index.html');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log("Listening on port " + port + "...");