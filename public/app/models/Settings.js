angular.module('app').factory('Settings', function($resource) {
  var Settings = $resource('/api/settings', {}, {});
  return Settings;
})