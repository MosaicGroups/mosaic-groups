angular.module('app').controller('userListCtrl', function($scope, $location, userService, identityService, userService, notifierService) {
  $scope.identity = identityService;
  $scope.users = userService.getUsers();

  $scope.editUser = function(user) {
    $location.path('/views/userEdit/user-edit/' + user._id);
  }

  $scope.deleteUser = function(user) {
    userService.deleteUser(user).then(function() {
      notifierService.notify('User ' + user.username + ' has been deleted');
      $scope.users = userService.getUsers();
    }, function(reason) {
      notifierService.error(reason);
    })
  }
});
