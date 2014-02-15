angular.module('app').controller('moUserListCtrl', function($scope, moUser) {
  $scope.users = moUser.query();
});
