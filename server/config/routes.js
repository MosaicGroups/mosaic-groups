var auth = require('./auth'),
  users = require('../controllers/users'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app, config) {
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', auth.requiresRole('admin'), users.createUser);
  app.put('/api/users', auth.requiresApiLogin, users.updateUser);

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