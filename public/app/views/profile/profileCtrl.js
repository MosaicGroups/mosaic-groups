angular.module('app').controller('profileCtrl', function($scope, authorizationService, notifierService, identityService) {
  $scope.username = identityService.currentUser.username;
  $scope.firstName = identityService.currentUser.firstName;
  $scope.lastName = identityService.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    authorizationService.updateCurrentUser(newUserData).then(function() {
      notifierService.notify('Your user account has been updated');
    }, function(reason) {
      notifierService.error(reason);
    })
  }
})
