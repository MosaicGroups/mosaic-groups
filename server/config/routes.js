var auth = require('./auth'),
  cache = require('./cache'),
  users = require('../controllers/usersController'),
  groups = require('../controllers/groupsController'),
  settings = require('../controllers/settingsController'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group');

module.exports = function(app, config) {
  app.get('/api/users/:id', cache.disableBrowserCache, auth.requiresRole('admin'), users.getUser);
  app.get('/api/users', cache.disableBrowserCache, auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users/:id', auth.requiresApiLogin, users.updateUser);
  app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);

  app.get('/api/groups/:id', cache.disableBrowserCache, groups.getGroup);
  app.get('/api/groups', cache.disableBrowserCache, groups.getGroups);
  app.post('/api/groups/:id/add-member', groups.addMember);

  app.post('/api/groups/emailGroupReportToSelf', cache.disableBrowserCache, auth.requiresRole('admin'), groups.emailGroupReportToSelf);
  app.post('/api/groups', cache.disableBrowserCache, auth.requiresApiLogin, groups.saveGroup);
  app.post('/api/groups/:id', cache.disableBrowserCache, auth.requiresApiLogin, groups.updateGroup);
  app.delete('/api/groups/:id', auth.requiresApiLogin, groups.deleteGroup);

  app.post('/api/users', cache.disableBrowserCache, users.saveUser, auth.authenticateUser);

  app.get('/api/settings', cache.disableBrowserCache, settings.getSettings);
  app.post('/api/settings', auth.requiresRole('admin'), settings.updateSettings);

  app.get('/partials/*', function(req, res) {
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