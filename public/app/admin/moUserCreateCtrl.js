angular.module('app').controller('moUserCreateCtrl', function($scope, moAuth, moNotifier) {
  $scope.username = "";
  $scope.firstName = "";
  $scope.lastName = "";

  $scope.update = function() {
    var newUserData = {
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    moAuth.createUser(newUserData).then(function() {
      moNotifier.notify('User ' + newUserData.username + ' has been created');
    }, function(reason) {
      moNotifier.error(reason);
    })
  }
})
