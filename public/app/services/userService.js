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

    saveUserData: function(userData) {
      var user = new User(userData);
      var dfd = $q.defer();

      user.$save().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    saveUser: function(user) {
      var deferred = $q.defer();

      //var clone = angular.copy(this.getUser(newUserData.id));
      //angular.extend(clone, newUserData);
      user.$save().then(function() {
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    }
  }
})