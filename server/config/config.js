/* global process */
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
// var rootPath = path.normalize(__dirname + '/../../client/');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// we need to default to the hosted dev DB is there is a username and password vars configured
var devDBConnection;
if (typeof (process.env.MOSAICGROUPS_USERNAME) != 'undefined' && typeof (process.env.MOSAICGROUPS_PASSWORD) != 'undefined') {
    devDBConnection = 'mongodb://' + process.env.MOSAICGROUPS_USERNAME + ':' + process.env.MOSAICGROUPS_PASSWORD + '@ds061288.mlab.com:61288/mosaicgroups-dev';
} else {
    if (typeof (process.env.DEV_HOST) != 'undefined') {
        devDBConnection = 'mongodb://' + process.env.DEV_HOST + ':27017/mosaicgroups';
    }
    else {
        devDBConnection = 'mongodb://localhost:27017/mosaicgroups';
    }
}
const envs = {
    development: {
        env: env,
        domain: 'localhost',
        db: {
            url: devDBConnection,
            debugMode: true
        },
        // root: rootPath,
        http: {
            port: process.env.PORT || 3030
        },
        https: {
            port: process.env.SSLPORT || 3031,
            options: {
                //key: fs.readFileSync('/data/certs/server.key'),
                //cert: fs.readFileSync('/data/certs/server.crt')
            }
        },
        scheduler: {
            enabledGroupReport: false,
            enabledDistinctMembersReport: false
        },
        emailer: {
            password: process.env.MOSAIC_GROUPS_EMAIL_PASSWORD
        }
    },
    production: {
        env: env,
        domain: 'www.mosaicgroups.org',
        db: {
            url: 'mongodb://' + process.env.MOSAICGROUPS_USERNAME + ':' + process.env.MOSAICGROUPS_PASSWORD + '@ds027489.mongolab.com:27489/mosaicgroups',
            debugMode: false
        },
        // root: rootPath,
        http: {
            port: process.env.PORT || 80
        },
        https: {
            port: process.env.SSLPORT || 443,
            options: {
                //key: fs.readFileSync('/data/certs/server.key'),
                //cert: fs.readFileSync('/data/certs/server.crt')
            }
        },
        scheduler: {
            enabledGroupReport: false,
            enabledDistinctMembersReport: false,
            hour: 11,
            minute: 59
        },
        emailer: {
            password: process.env.MOSAIC_GROUPS_EMAIL_PASSWORD
        }
    }
};
envs.test = envs.development;

module.exports = envs[env];