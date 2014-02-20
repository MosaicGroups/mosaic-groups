angular.module('app').factory('userService', function($q, User) {
  return {
    getUsers: function() {
      return User.query();
    },

    getUser: function(userId) {
      return User.find({id: userId});
    },

    updateUserToEdit: function(updatedUser) {
      var deferred = $q.defer();

      //var clone = angular.copy(this.getUser(newUserData.id));
      //angular.extend(clone, newUserData);
      updatedUser.$update({id: updatedUser.id}).then(function() {
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    }
  }
})