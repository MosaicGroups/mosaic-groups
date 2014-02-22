angular.module('app').factory('groupService', function($q, Group) {
  return {
    getGroups: function() {
      return Group.query();
    },

    getGroup: function(id) {
      return Group.get({id: id});
    },

    deleteGroup: function(group) {
      var dfd = $q.defer();
      group.$delete().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      })
      return dfd.promise;
    },

    saveGroupDataAsNewGroup: function(groupData) {
      var group = new Group(groupData);
      var dfd = $q.defer();
      group.$save().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    saveGroup: function(group) {
      var deferred = $q.defer();
      group.$save().then(function() {
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    }
  }
})