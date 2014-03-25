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
//      hour: 12, // 12 noon == 8am EST on the heroku server because it is +4hrs
//      minute: 00
    }
  },
  production: {
    db: {
      url: 'mongodb://mosaicadmin:ilovemosiac!@ds027489.mongolab.com:27489/mosaicgroups',
      debugMode: false
    },
    rootPath: rootPath,
    port: process.env.PORT || 80,
    scheduler: {
      enabled: true,
      hour: 11, // 11 noon == 7am EST on the heroku server because it is +4hrs
      minute: 59
    }
  }
}