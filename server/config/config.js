var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost/mosaicgroups',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://mosaicadmin:ilovemosiac!@ds027489.mongolab.com:27489/mosaicgroups',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}