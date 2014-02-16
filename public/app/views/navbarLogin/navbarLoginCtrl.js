angular.module('app').controller('navbarLoginCtrl', function($scope, $http, $location, identityService, notifierService, authorizationService) {
  $scope.identityService = identityService;
  $scope.signin = function(username, password) {
    authorizationService.authenticateUser(username, password).then(function(success) {
      if (success) {
        notifierService.notify('You have successfully signed in!');
      } else {
        notifierService.notify('Username/Password combination incorrect');
      }
    });
  }
  $scope.signout = function() {
    authorizationService.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      notifierService.notify('You have successfully signed out!');
      $location.path('/');
    })
  }
});
