angular.module('app').controller('userEditCtrl', function ($scope, $route, $location, notifierService, userService, identityService) {
    $scope.identity = identityService;

    $scope.userToEdit = userService.getUser($route.current.params.id);

    $scope.saveUser = function () {
        userService.saveUser($scope.userToEdit).then(function (user) {
            $scope.userToEdit = user;
            if ($scope.identity.currentUser._id === $scope.userToEdit._id) {
                angular.extend(identityService.currentUser, $scope.userToEdit);
            }
            notifierService.notify('User has been updated');
            $location.path('/views/userList/user-list');
        }, function (reason) {
            notifierService.error(reason);
        });
    };
});
