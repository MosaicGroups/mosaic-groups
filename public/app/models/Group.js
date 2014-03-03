angular.module('app').factory('Group', function($resource) {
  var Group =  $resource('/api/groups/:id', {id: "@_id"},
                {addMember: {method: "POST", url: "/api/groups/:id/add-member"}});
  return Group;
})