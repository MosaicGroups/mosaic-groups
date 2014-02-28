angular.module('app').factory('Group', function($resource) {
  var Group =  $resource('/api/groups/:id', {id: "@_id"}, {});
  return Group;
})