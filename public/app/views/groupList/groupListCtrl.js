angular.module('app').controller('groupListCtrl', function($scope, $location, $filter, $q, ngTableParams, groupService, identityService, notifierService) {
  $scope.identityService = identityService;
  $scope.data = undefined;
  $scope.genderTypes = undefined;

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

        // apply filtering/searching
        orderedData = params.filter() ?
          $filter('filter')(orderedData, params.filter()) :
          orderedData;
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

  $scope.genderTypes = function($column) {
    var def = $q.defer(),
      arr = [],
      genderTypes = [];
    genderTypes.push({
      'id': "Women",
      'title': "Women"
    });
    genderTypes.push({
      'id': "Men",
      'title': "Men"
    });
    def.resolve(genderTypes);
    return def;
  };

  $scope.childcareTypes = function($column) {
    var def = $q.defer(),
      arr = [],
      childcareTypes = [];
    childcareTypes.push({
      'id': true,
      'title': "yes"
    });
    childcareTypes.push({
      'id': false,
      'title': "no"
    });
    def.resolve(childcareTypes);
    return def;
  };

  $scope.topicTypes = function($column) {
    var def = $q.defer(),
      arr = [],
      topicTypes = [];
    topicTypes.push({
      'id': "Sports",
      'title': "Sports"
    });
    topicTypes.push({
      'id': "Book/Bible Study",
      'title': "Book/Bible Study"
    });
    topicTypes.push({
      'id': "Food",
      'title': "Food"
    });
    topicTypes.push({
      'id': "Discussion",
      'title': "Discussion"
    });
    topicTypes.push({
      'id': "Hobby/Interest",
      'title': "Hobby/Interest"
    });
    topicTypes.push({
      'id': "Service",
      'title': "Service"
    });
    topicTypes.push({
      'id': "Finance",
      'title': "Finance"
    });

    def.resolve(topicTypes);
    return def;
  };
});