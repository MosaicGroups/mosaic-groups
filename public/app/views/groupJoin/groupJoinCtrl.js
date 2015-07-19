angular.module('app').controller('groupJoinCtrl', function($scope, $route, $location, groupService, notifierService) {
  var groupId = $route.current.params.id;

  $scope.group = groupService.getGroup(groupId);
  $scope.group.newMember = {
    firstName: "",
    lastName: "",
    email: "",
    status: "PENDING"
  };

  $scope.disableJoin = false;

  $scope.joinGroup = function() {
    // if the form is valid then submit to the server
    if ($scope.groupJoinForm.$valid && !$scope.groupIsFull($scope.group)) {
      $scope.disableJoin = true;
      groupService.addMember($scope.group).then(function() {
        notifierService.notify('Your request to join "' + $scope.group.title + '" has been sent');
        $location.path('/');
      }, function() {
        notifierService.error('Not able to join "' + $scope.group.title + '" at this time');
      });
    }
  };

  $scope.groupIsFull = function (group) {
    return group.members.length >= group.memberLimit;
  };
});
