var auth = require('./auth'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app, config) {
  app.get('/api/users', auth.requiresRole('admin'), function(req, res) {
    User.find({}).exec(function(err, collection) {
      res.send(collection);
    })
  });

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  // ensure that the client side application does ALL of the routing
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
}