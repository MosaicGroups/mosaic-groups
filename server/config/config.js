var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost:27017/mosaicgroups',
    rootPath: rootPath,
    port: process.env.PORT || 3030,
    scheduler: {
      enabled: false,
      hour: 4,
      minute: 10
    }
  },
  production: {
    db: 'mongodb://mosaicadmin:ilovemosiac!@ds027489.mongolab.com:27489/mosaicgroups',
    rootPath: rootPath,
    port: process.env.PORT || 80,
    scheduler: {
      enabled: true,
      hour: 8,
      minute: 00
    }
  }
}