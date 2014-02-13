angular.module('app').controller('moNavBarLoginCtrl', function($scope, $http) {
  $scope.signin = function(username, password) {
    $http.post('/login', {username: username, password: password}).then(function(response) {
      if (response.data.success) {
        console.log('logged in!');
      } else {
        console.log('login failure');
      }
    })
  }
})
