angular.module('app').controller('groupListCtrl', function($scope, groupService, identityService, notifierService) {
  $scope.groups = groupService.getGroups();
  $scope.identity = identityService;

  $scope.editGroup = function(group) {
    notifierService.notify("Not yet implemented");
  }

  $scope.deleteGroup = function(group) {
    notifierService.notify("Not yet implemented");
  }

  $scope.canEdit = function(group) {
    var canEditGroup = false;
    if (!identityService.isAuthenticated()) {
      canEditGroup = false;
    }
    else if (identityService.isAdmin()) {
      canEditGroup = true;
    }
    else if ($scope.userIsLeaderOfGroup(identityService.currentUser, group)) {
      canEditGroup = true;
    }
    return canEditGroup;
  }

  $scope.userIsLeaderOfGroup = function(user, group) {
    var canEditGroup = false;
    for (var i = 0; i < group.leaders.length; i++) {
      var leader = group.leaders[i];
      if (user._id === leader._id) {
        canEditGroup = true;
      }
    }
    return canEditGroup;
  }
});