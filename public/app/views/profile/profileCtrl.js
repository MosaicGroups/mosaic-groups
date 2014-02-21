angular.module('app').controller('profileCtrl', function($scope, userService, notifierService, identityService) {
  $scope.username = identityService.currentUser.username;
  $scope.firstName = identityService.currentUser.firstName;
  $scope.lastName = identityService.currentUser.lastName;

  $scope.saveUser = function() {
    var newUserData = {
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    // create a new User resource from the current user
    var user = angular.copy(identityService.currentUser)
    // copy the new data from the Form to this new User
    angular.extend(user, newUserData)

    // save the User resource
    userService.saveUser(user).then(function() {
      notifierService.notify('Your user account has been updated');
    }, function(reason) {
      notifierService.error(reason);
    })
  }
})
