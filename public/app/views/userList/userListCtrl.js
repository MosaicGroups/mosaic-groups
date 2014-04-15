angular.module('app').controller('userListCtrl', function($scope, $location, $modal, userService, identityService, userService, notifierService) {
  $scope.identity = identityService;
  $scope.users = userService.getUsers();

  $scope.editUser = function(user) {
    $location.path('/views/userEdit/user-edit/' + user._id);
  }

  $scope.deleteUser = function(user) {
    var modalInstance = $modal.open({
      templateUrl: '/partials/userList/confirm-delete-user-modal',
      controller: confirmDeleteUserCtrl,
      resolve: {
        user: function () {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.users = userService.getUsers();
    });
  }
});

var confirmDeleteUserCtrl = function($scope, $modalInstance, userService, notifierService, user) {
  $scope.user = user;
  $scope.confirm = function () {
    userService.deleteUser(user).then(function() {
      notifierService.notify('User ' + user.username + ' has been deleted');
    }, function(reason) {
      notifierService.error(reason);
    });
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}
