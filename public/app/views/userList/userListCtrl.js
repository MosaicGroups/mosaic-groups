angular.module('app').controller('userListCtrl', function($scope, User, identityService, authorizationService, notifierService) {
  $scope.identity = identityService;
  $scope.users = User.query();

  $scope.editUser = function(user) {
    notifierService.notify("This feature is not yet implemented");
  }

  $scope.deleteUser = function(user) {
    authorizationService.deleteUser(user).then(function() {
      notifierService.notify('User ' + user.username + ' has been deleted');
      $scope.users = User.query();
    }, function(reason) {
      notifierService.error(reason);
    })
  }
});
