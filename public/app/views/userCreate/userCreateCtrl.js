angular.module('app').controller('userCreateCtrl', function($scope, $location, userService, notifierService, identityService) {
  $scope.identity = identityService; 

  $scope.user = "";

  $scope.username = "";
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.password = "";
  $scope.roles = [];

  $scope.saveUserDataAsNewUser = function() {
    // if the form is valid then submit to the server
    if (userCreateForm.checkValidity()) {
      var newUserData = {
        username: $scope.username,
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        roles: $scope.roles
      }
      if($scope.password && $scope.password.length > 0) {
        newUserData.password = $scope.password;
      }

      userService.saveUserDataAsNewUser(newUserData).then(function() {
        notifierService.notify('User ' + newUserData.username + ' has been created');
        $location.path('/views/userList/user-list');
      }, function(reason) {
        notifierService.error(reason);
      })
    }
  }
})
