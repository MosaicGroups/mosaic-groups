var auth = require('./auth');
var cache = require('./cache');
var config = require('./config');
var users = require('../controllers/usersController');
var groups = require('../controllers/groupsController');
var settings = require('../controllers/settingsController');


// in production env, and if the proper headers are seen in the request, redirect to https
let secureRedirect = function () {
    return function (req, res, next) {
        if (process.env.NODE_ENV == 'production') {
            if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
                res.redirect('https://' + config.domain + ':' + config.https.port + req.originalUrl);
            } else {
                next();
            }
        } else {
            res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
            if (!req.secure) {
                res.redirect('https://' + config.domain + ':' + config.https.port + req.originalUrl);
            } else {
                next();
            }
        }
    }
};

//routes
module.exports = function (app) {


    app.get('/api/users/:id', cache.disableBrowserCache, auth.requiresRole('admin'), users.getUser);
    app.get('/api/users', cache.disableBrowserCache, users.getUsers);
    app.post('/api/users/:id', auth.requiresApiLogin, users.updateUser);
    app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);

    app.get('/api/groups/:id', cache.disableBrowserCache, groups.getGroup);
    app.get('/api/groups', cache.disableBrowserCache, groups.getGroups);
    app.post('/api/groups/:id/add-member', settings.requiresGroupsEnabled, groups.addMember);

    app.post('/api/groups/emailGroupReportToSelf', cache.disableBrowserCache, auth.requiresRole('admin'), groups.emailGroupReportToSelf);
    app.post('/api/groups/emailUniqueReportToSelf', cache.disableBrowserCache, auth.requiresRole('admin'), groups.emailUniqueReportToSelf);
    app.post('/api/groups', cache.disableBrowserCache, auth.requiresApiLogin, groups.saveGroup);
    app.post('/api/groups/:id', cache.disableBrowserCache, auth.requiresApiLogin, groups.updateGroup);
    app.delete('/api/groups/:id', auth.requiresApiLogin, groups.deleteGroup);

    app.post('/api/users', cache.disableBrowserCache, users.saveUser, auth.loginUser);

    app.get('/api/settings', cache.disableBrowserCache, settings.getSettings);
    app.post('/api/settings', auth.requiresRole('admin'), settings.updateSettings);



    app.post('/login', auth.login);

    app.post('/logout', auth.logout);

    app.get('/build*', function (req, res) {
        res.sendFile(req.path, config);
    });
    app.get('/img*', function (req, res) {
        res.sendFile(req.path, config);
    });
    app.get('/css*', function (req, res) {
        res.sendFile(req.path, config);
    });

    // ensure that the client side application does ALL of the routing
    app.get('/*', function (req, res) {
        res.sendFile('index.html', config);
    });
};