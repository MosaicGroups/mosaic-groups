angular.module('app').factory('moAuth', function($http, moIdentity, $q, moUser) {
  return {
    authenticateUser: function(username, password) {
      var deferred = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function(response) {
        if (response.data.success) {
          var user = new moUser();
          angular.extend(user, response.data.user);
          moIdentity.currentUser = user;
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    },

    updateCurrentUser: function(newUserData) {
      var deferred = $q.defer();

      var clone = angular.copy(moIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        moIdentity.currentUser = clone;
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    },

    logoutUser: function() {
      var deferred = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        moIdentity.currentUser = undefined;
        deferred.resolve();
      });
      return deferred.promise;
    },
    authorizeAuthorizedUserForRoute: function(role) {
      if (moIdentity.isAuthorized('admin')) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedUserForRoute: function() {
      if (moIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
})