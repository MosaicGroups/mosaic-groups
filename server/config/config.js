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
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: {
      url: 'mongodb://localhost:27017/mosaicgroups',
      debugMode: true
    },
    rootPath: rootPath,
    port: process.env.PORT || 3030,
    scheduler: {
      enabled: false
    }
  },
  production: {
    db: {
      url: 'mongodb://'+process.env.MOSAICGROUPS_USERNAME+':'+process.env.MOSAICGROUPS_PASSWORD+'@ds027489.mongolab.com:27489/mosaicgroups',
      debugMode: false
    },
    rootPath: rootPath,
    port: process.env.PORT || 80,
    scheduler: {
      enabled: true,
      hour: 11, // 11am == 7am EST on the heroku server because it is +4hrs
      minute: 59
    }
  }
}