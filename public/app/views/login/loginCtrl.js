angular.module('app').controller('loginCtrl', function($scope, $location, userService, notifierService, authorizationService) {

  $scope.login = function(username, password) {
    authorizationService.authenticateUser($scope.loginUsername, $scope.loginPassword).then(function(success) {
      if (success) {
        notifierService.notify('You have successfully signed in!');
        $location.path('/');
      } else {
        notifierService.error('Username/Password combination incorrect');
      }
    });
  }

  $scope.signup = function() {
    var newUserData = {
      username: $scope.signupUsername,
      password: $scope.signupPassword,
      firstName: $scope.signupFirstName,
      lastName: $scope.signupLastName
    };

    authorizationService.createUser(newUserData).then(function() {
      notifierService.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      notifierService.error(reason);
    })
  }
})