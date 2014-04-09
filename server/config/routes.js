var auth = require('./auth'),
  users = require('../controllers/usersController'),
  groups = require('../controllers/groupsController'),
  settings = require('../controllers/settingsController'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group');

var noCache;
noCache = function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
  return next();
};

module.exports = function(app, config) {
  app.get('/api/users/:id', noCache, auth.requiresRole('admin'), users.getUser);
  app.get('/api/users', noCache, auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users/:id', noCache, auth.requiresApiLogin, users.updateUser);
  app.delete('/api/users/:id', noCache, auth.requiresRole('admin'), users.deleteUser);

  app.get('/api/groups/:id', noCache, groups.getGroup);
  app.get('/api/groups', noCache, groups.getGroups);
  app.post('/api/groups/:id/add-member', noCache, groups.addMember);

  app.post('/api/groups/emailGroupReportToSelf', noCache, auth.requiresRole('admin'), groups.emailGroupReportToSelf);
  app.post('/api/groups', noCache, auth.requiresApiLogin, groups.saveGroup);
  app.post('/api/groups/:id', noCache, auth.requiresApiLogin, groups.updateGroup);
  app.delete('/api/groups/:id', noCache, auth.requiresApiLogin, groups.deleteGroup);

  app.post('/api/users', noCache, users.saveUser, auth.authenticateUser);

  app.get('/api/settings', noCache, settings.getSettings);
  app.post('/api/settings', noCache, auth.requiresRole('admin'), settings.updateSettings);

  app.get('/partials/*', function(req, res) {
    console.log("rendering: " + '../../public/app/views/' + req.params)
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