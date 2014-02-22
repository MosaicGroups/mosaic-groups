var auth = require('./auth'),
  users = require('../controllers/usersController'),
  groups = require('../controllers/groupsController'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group');

module.exports = function(app, config) {
  // getUsers
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  // getUser
  app.get('/api/users/:_id', auth.requiresRole('admin'), users.getUser);
  // saveUser
  app.post('/api/users', auth.requiresRole('admin'), users.saveUser);
  // deleteUser
  app.delete('/api/users/:_id', auth.requiresRole('admin'), users.deleteUser);
  // updateUser
  app.post('/api/users/:_id', auth.requiresRole('admin'), users.updateUser);
  // getGroups
  app.get('/api/groups', groups.getGroups);
  // saveGroups
  app.post('/api/groups', auth.requiresApiLogin, groups.saveGroup);
  // updateGroups
  app.post('/api/groups/:_id', auth.requiresApiLogin, groups.updateGroup);

  app.get('/partials/*', function(req, res) {
    console.log("trying to render: " + '../../public/app/views/' + req.params)
    res.render('../../public/app/views/' + req.params);
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