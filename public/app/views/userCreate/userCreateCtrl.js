angular.module('app').controller('userCreateCtrl', function($scope, $location, userService, notifierService, identityService) {
  $scope.identity = identityService; 

  $scope.user = "";

  $scope.username = "";
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.password = "";
  $scope.roles = [];

  //$scope.userOnBlur = function() {
  $scope.$watch('user', function(newVal, oldVal) {
    var pattern = /([^ ]+)\s*([^<]+)\s<(.*)>/;
    var userString = newVal;

    // remove any quotes in the string
    userString = userString.replace(/"/g, "");

    // run the regex to extract the firstName, lastName, and email/username
    var matches = pattern.exec(userString);
    if (matches) {
      $scope.firstName = matches[1];
      $scope.lastName = matches[2];
      $scope.username = matches[3];
    }
  });

  $scope.$watch('firstName', function(newVal, oldVal) {
    if (newVal === undefined) { newVal = ""; }
    $scope.user = newVal + " " + $scope.lastName + " <" + $scope.username + ">"
  });
  $scope.$watch('lastName', function(newVal, oldVal) {
    if (newVal === undefined) { newVal = ""; }
    $scope.user = $scope.firstName + " " + newVal + " <" + $scope.username + ">"
  });
  $scope.$watch('username', function(newVal, oldVal) {
    if (newVal === undefined) { newVal = ""; }
    $scope.user = $scope.firstName + " " + $scope.lastName + " <" + newVal + ">"
  });

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
