angular.module('app').controller('moProfileCtrl', function($scope, moAuth, moIdentity, moNotifier) {
  $scope.email = moIdentity.currentUser.username;
  $scope.fname = moIdentity.currentUser.firstName;
  $scope.lname = moIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
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
