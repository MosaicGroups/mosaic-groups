module.exports = function(app, config) {
  app.get('/partials/*', function(req, res) {
    console.log(config.rootPath + '/public/app/' + req.params);
    res.sendfile(config.rootPath + '/public/app/' + req.params);
  });

  // ensure that the client side application does ALL of the routing
  app.get('*', function(req, res) {
    res.sendfile(config.rootPath + '/server/views/index.html');
  });
}