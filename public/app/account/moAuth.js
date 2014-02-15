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
    logoutUser: function() {
      var deferred = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        moIdentity.currentUser = undefined;
        deferred.resolve();
      });
      return deferred.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if (moIdentity.isAuthorized('admin')) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
})