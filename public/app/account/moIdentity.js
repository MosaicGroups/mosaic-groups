angular.module('app').factory('moIdentity', function($window, moUser) {
  var currentUser;
  if ($window.bootstrappedUserObject) {
    currentUser = new moUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      console.log("is authenticated " + !!this.currentUser)
      if (!!this.currentUser) {
        console.log(" current user: " + this.currentUser.username);
      }
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
    }
  }
})