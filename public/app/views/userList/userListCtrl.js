angular.module('app').controller('userListCtrl', function($scope, User, identityService) {
  $scope.identity = identityService;
  $scope.users = User.query();
});
