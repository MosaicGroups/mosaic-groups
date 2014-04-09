angular.module('app').factory('settingsService', function($q, Settings) {
  return {
    getSettings: function() {
      return Settings.query();
    },

    saveSettings: function(settings) {
      var deferred = $q.defer();
      settings.$save().then(function(settings) {
        deferred.resolve(settings);
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    }
  }
})