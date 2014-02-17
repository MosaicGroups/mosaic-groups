angular.module('app').factory('authorizationService', function($http, $q, identityService, User) {
  return {
    authenticateUser: function(username, password) {
      var deferred = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function(response) {
        if (response.data.success) {
          var user = new User();
          angular.extend(user, response.data.user);
          identityService.currentUser = user;
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    },

    createUser: function(newUserData) {
      var newUser = new User(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    deleteUser: function(user) {
      var dfd = $q.defer();

      var userToDelete = new User();
      angular.extend(userToDelete, user);
      userToDelete.$delete().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      })

      return dfd.promise;
    },

    updateCurrentUser: function(newUserData) {
      var deferred = $q.defer();

      var clone = angular.copy(identityService.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        identityService.currentUser = clone;
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    },

    logoutUser: function() {
      var deferred = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        identityService.currentUser = undefined;
        deferred.resolve();
      });
      return deferred.promise;
    },

    authorizeAuthorizedUserForRoute: function(role) {
      if (identityService.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },

    authorizeAuthenticatedUserForRoute: function() {
      if (identityService.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
})