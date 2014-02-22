angular.module('app').controller('groupListCtrl', function($scope, groupService) {
  $scope.groups = groupService.getGroups();
});