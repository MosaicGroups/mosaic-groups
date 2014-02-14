angular.module('app').controller('moNavBarLoginCtrl', function($scope, $http, $location, moIdentity, moNotifier, moAuth) {
  $scope.identity = moIdentity;
  $scope.signin = function(username, password) {
    moAuth.authenticateUser(username, password).then(function(success) {
      if (success) {
        moNotifier.notify('You have successfully signed in!');
      } else {
        moNotifier.notify('Username/Password combination incorrect');
      }
    });
  }
  $scope.signout = function() {
    moAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      moNotifier.notify('You have successfully signed out!');
      $location.path('/');
    })
  }
});
