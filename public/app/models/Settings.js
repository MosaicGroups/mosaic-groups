angular.module('app').factory('Settings', function($resource) {
  var Settings = $resource('/api/settings', {},
    {
      save: {method: "POST", cache: false},
      query: {method: "GET", cache: false, isArray: false}
    }
  );
  return Settings;
})