angular.module('app').factory('Group', function($resource) {
  var Group =  $resource('/api/groups/:id', {_id: "@_id"}, {});
  return Group;
})