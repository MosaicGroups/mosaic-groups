angular.module('app').factory('moIdentity', function() {
  return {
    currentUser: undefined,
    isAuthenticated: function() {
      console.log("is authenticated " + !!this.currentUser)
      if (!!this.currentUser) {
        console.log(" current user: " + this.currentUser.username);
      }
      return !!this.currentUser;
    }
  }
})