angular.module('app').factory('userService', function($q, User) {
  return {
    getUsers: function() {
      return User.query();
    },

    getUser: function(id) {
      return User.get({id: id});
    },

    deleteUser: function(user) {
      var dfd = $q.defer();
      user.$delete().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      })
      return dfd.promise;
    },

    saveUserDataAsNewUser: function(userData) {
      var user = new User(userData);
      var dfd = $q.defer();
      user.$save().then(function(user) {
        dfd.resolve(user);
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    saveUser: function(user) {
      var deferred = $q.defer();
      user.$save().then(function(user) {
        deferred.resolve(user);
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    }
  }
})