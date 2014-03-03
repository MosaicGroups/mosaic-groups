angular.module('app').controller('groupListCtrl', function($scope, $location, $filter, ngTableParams, groupService, identityService, notifierService) {
  $scope.identity = identityService;

  $scope.tableParams = new ngTableParams({
    page: 1,            // show first page
    count: 10,          // count per page
    sorting: function(data) {
      switch(data.dayOfTheWeek) {
        case "Sunday":
          return 1; break;
        case "Monday":
          return 2; break;
        case "Tuesday":
          return 3; break;
        case "Wednesday":
          return 4; break;
        case "Thursday":
          return 5; break;
        case "Friday":
          return 6; break;
        case "Saturday":
          return 7; break;
      }
    }
  }, {
    total: 0, // length of $scope.groups
    groupBy: 'dayOfTheWeek',
    getData: function($defer, params) {
      groupService.getGroups().$promise.then(function(data) {
        params.total(data.total);
        var orderedData = params.sorting() ?
          $filter('orderBy')(data, $scope.tableParams.sorting()) :
          data;
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      });
    }
  });

  $scope.joinGroup = function(group) {
    $location.path('/views/groupJoin/group-join/' + group._id);
  }

  $scope.editGroup = function(group) {
    $location.path('/views/groupCreateOrEdit/group-create-or-edit/' + group._id);
  }

  $scope.deleteGroup = function(group) {
    groupService.deleteGroup(group).then(function() {
      notifierService.notify('Group \'' + group.title + '\' has been deleted');
      $scope.tableParams.reload();
    }, function(reason) {
      notifierService.error(reason);
    });
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