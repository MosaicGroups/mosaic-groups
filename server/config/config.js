/**
 * Configure the application.
 *
 * You can set additional heroku environmental variables like this:
 *   $ heroku config:set GITHUB_USERNAME=joesmith
 *   Adding config vars and restarting myapp... done, v12
 *   GITHUB_USERNAME: joesmith
 *
 *   $ heroku config
 *   GITHUB_USERNAME: joesmith
 *   OTHER_VAR:       production
 */
var path = require('path');
var fs = require('fs');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    domain: 'localhost',
    db: {
      url: 'mongodb://localhost:27017/mosaicgroups',
      debugMode: true
    },
    rootPath: rootPath,
    http: {
      port: process.env.PORT || 3030
    },
    https: {
      port: process.env.SECURE_PORT || 3031,
      options : {
        key: fs.readFileSync('server/certs/server.key'),
        cert: fs.readFileSync('server/certs/server.crt')
      }
    },
    scheduler: {
      enabled: false
    }
  },
  production: {
    domain: 'mosaicgroups.org',
    db: {
      url: 'mongodb://'+process.env.MOSAICGROUPS_USERNAME+':'+process.env.MOSAICGROUPS_PASSWORD+'@ds027489.mongolab.com:27489/mosaicgroups',
      debugMode: false
    },
    rootPath: rootPath,
    http: {
      port: process.env.PORT || 80
    },
    https: {
      port: process.env.SECURE_PORT || 443,
      options : {
        key: fs.readFileSync('server/certs/server.key'),
        cert: fs.readFileSync('server/certs/server.crt')
      }
    },
    scheduler: {
      enabled: true,
      hour: 11, // 11am == 7am EST on the heroku server because it is +4hrs
      minute: 59
    }
  }
}