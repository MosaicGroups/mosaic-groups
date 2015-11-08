angular.module('app').controller('groupJoinCtrl', function($scope, $route, $location, groupService, notifierService, identityService) {
  var groupId = $route.current.params.id;

  $scope.disableJoin = false;
  $scope.groupIsFull = false;
  $scope.emailConfirmed = '';
  $scope.joinButtonTooltip = ''

  groupService.getGroup(groupId).$promise.then(function(data) {
    $scope.group = data;
    $scope.group.newMember = {
      firstName: "",
      lastName: "",
      email: "",
      status: "PENDING"
    };
    $scope.groupIsFull = $scope.group.members.length >= $scope.group.memberLimit;
    if ($scope.group.isForLeadersOnly() && !identityService.isAuthenticated()) {
      $scope.disableJoin = true;
      var errorMsg = 'You must be logged in if you want to join this group';
      $scope.joinButtonTooltip = errorMsg;
      notifierService.error(errorMsg);
    }
  });

  $scope.joinGroup = function() {
    // if the form is valid then submit to the server
    if (!$scope.groupIsFull && !$scope.disableJoin) {
      $scope.disableJoin = true;
      groupService.addMember($scope.group).then(function() {
        notifierService.notify('Your request to join "' + $scope.group.title + '" has been sent');
        $location.path('/');
      }, function() {
        notifierService.error('Not able to join "' + $scope.group.title + '" at this time');
      });
    }
  };
});
