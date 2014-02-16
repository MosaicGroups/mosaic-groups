angular.module('app').controller('moProfileCtrl', function($scope, moAuth, moIdentity, moNotifier) {
  $scope.username = moIdentity.currentUser.username;
  $scope.firstName = moIdentity.currentUser.firstName;
  $scope.lastName = moIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    moAuth.updateCurrentUser(newUserData).then(function() {
      moNotifier.notify('Your user account has been updated');
    }, function(reason) {
      moNotifier.error(reason);
    })
  }
})
