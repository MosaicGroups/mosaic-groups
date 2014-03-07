angular.module('app').controller('groupListCtrl', function($scope, $location, $filter, $q, ngTableParams, genderTypes, daysOfTheWeek, availableTopics, groupService, identityService, notifierService) {
  $scope.identityService = identityService;
  $scope.data = undefined;

  $scope.genderTypes = genderTypes;
  $scope.genderTypes.unshift("-");
  $scope.daysOfTheWeek = daysOfTheWeek;
  $scope.daysOfTheWeek.unshift("-");
  $scope.availableTopics = availableTopics;
  $scope.availableTopics.unshift("-");
  $scope.childcareTypes = ["-", "yes", "no"];

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
        $scope.data = data;
        params.total(data.total);

        // apply sorting
        var orderedData = params.sorting() ?
          $filter('orderBy')(data, $scope.tableParams.sorting()) :
          data;

//        // apply filtering/searching
//        orderedData = params.filter() ?
//          $filter('filter')(orderedData, params.filter()) :
//          orderedData;
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

  var inArray = Array.prototype.indexOf ?
    function (val, arr) {
      return arr.indexOf(val)
    } :
    function (val, arr) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === val) return i;
      }
      return -1;
    }
});