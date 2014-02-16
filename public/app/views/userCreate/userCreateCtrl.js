angular.module('app').controller('userCreateCtrl', function($scope, authorizationService, notifierService, identityService) {
  $scope.identity = identityService; 

  $scope.username = "";
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.password = "";
  $scope.roles = [];

  $scope.createUser = function() {
    var newUserData = {
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      roles: $scope.roles
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    authorizationService.createUser(newUserData).then(function() {
      notifierService.notify('User ' + newUserData.username + ' has been created');
    }, function(reason) {
      notifierService.error(reason);
    })
  }
})
