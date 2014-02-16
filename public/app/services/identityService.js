angular.module('app').factory('identityService', function($window, User) {
  var currentUser;
  if ($window.bootstrappedUserObject) {
    currentUser = new User();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
    },
    isAdmin: function() {
      return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
    },
    isSuperAdmin: function() {
      return !!this.currentUser && this.currentUser.roles.indexOf('superadmin') > -1;
    }
  }
})