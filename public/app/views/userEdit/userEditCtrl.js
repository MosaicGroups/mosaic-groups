angular.module('app').controller('userEditCtrl', function($scope, $route, notifierService, userService, identityService) {
  $scope.identity = identityService;

  $scope.userToEdit = userService.getUser($route.current.params.id);

  $scope.update = function() {
    userService.updateUserToEdit($scope.userToEdit).then(function() {
      notifierService.notify('User has been updated');
    }, function(reason) {
      notifierService.error(reason);
    })
  }
})
