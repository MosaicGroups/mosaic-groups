angular.module('app').factory('moIdentity', function($window) {
  var currentUser;
  if ($window.bootstrappedUserObject) {
    currentUser = $window.bootstrappedUserObject;
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      console.log("is authenticated " + !!this.currentUser)
      if (!!this.currentUser) {
        console.log(" current user: " + this.currentUser.username);
      }
      return !!this.currentUser;
    }
  }
})