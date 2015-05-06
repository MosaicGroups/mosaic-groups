angular.module('app').controller('groupListCtrl', function($scope, $location, $filter, $q, $modal, ngTableParams, audienceTypes, daysOfTheWeek, availableTopics, groupService, identityService, notifierService, settingsService) {
  $scope.identityService = identityService;
  $scope.data = undefined;

  $scope.audienceTypes = angular.copy(audienceTypes, $scope.audienceTypes);
  $scope.audienceTypes.unshift("");
  $scope.audienceTypesFilter = $scope.audienceTypes[0];

  $scope.daysOfTheWeek = angular.copy(daysOfTheWeek, $scope.daysOfTheWeek)
  $scope.daysOfTheWeek.unshift("");
  $scope.dayOfTheWeekFilter = [$scope.daysOfTheWeek[0]];

  $scope.availableTopics = angular.copy(availableTopics, $scope.availableTopics);
  $scope.availableTopics.unshift("");
  $scope.topicsFilter = $scope.availableTopics[0];

  $scope.childcareTypes = [
    {label:"", value:""},
    {label: "yes", value: true},
    {label: "no", value: false}
  ];
  $scope.childcareFilter = $scope.childcareTypes[0];

  $scope.settings = {
    disableGroups: true,
    showNextSemesterMsg: false,
    nextSemesterMsg: 'Next Semester Growth Groups Coming Soon!'
  };

  $scope.showNextSemesterMsg = function() {
    return $scope.settings.showNextSemesterMsg;
  }

  $scope.setShowNextSemesterMsg = function(value) {
    var settings = {};
    angular.copy($scope.settings, settings);
    settings.showNextSemesterMsg = value;
    settingsService.saveSettings(settings).then(function(data){
      $scope.settings = data;
    }, function(reason) {
      notifierService.error(reason);
    });
  }

  $scope.setNextSemesterMessage = function(msg) {
    var settings = {};
    angular.copy($scope.settings, settings);
    settings.nextSemesterMsg = msg;
    settingsService.saveSettings(settings).then(function(data){
      $scope.settings = data;
      notifierService.notify("The new message: '" + msg + "' will be shown to everyone")
    }, function(reason) {
      notifierService.error(reason);
    });
  }

  $scope.tableFilter = {};
  $scope.tableFilterStrict = {};
  $scope.updateFilter = function(filterName, filterValue) {
    if (filterValue === "" || filterValue === "ALL" || filterValue === "EITHER") {
      delete $scope.tableFilter[filterName];
      delete $scope.tableFilterStrict[filterName];
    }
    else if (filterName === "dayOfTheWeek" || filterName === "audienceType" || filterName === "childcare" || filterName === "topics") {
      $scope.tableFilterStrict[filterName] = filterValue;
    }
    else {
      $scope.tableFilter[filterName] = filterValue;
    }
    $scope.tableParams.reload();
  }

  $scope.tableParams = new ngTableParams({
    page: 1,            // show first page
    count: 100,          // count per page
    sorting:
      function(data) {
        switch(data.dayOfTheWeek) {
          case "Mid-Semester":
            return 1; break;
          case "Sunday":
            return 2; break;
          case "Monday":
            return 3; break;
          case "Tuesday":
            return 4; break;
          case "Wednesday":
            return 5; break;
          case "Thursday":
            return 6; break;
          case "Friday":
            return 7; break;
          case "Saturday":
            return 8; break;
      }
    }
  }, {
    counts: [],
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

        // apply filtering/searching based on any text in the given column
        orderedData = params.filter() ?
          $filter('filter')(orderedData, $scope.tableFilter, "false") :
          orderedData;
        // apply the strict filters
        orderedData = params.filter() ?
          $filter('filter')(orderedData, $scope.tableFilterStrict, function(a, e) {return a === e}):
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
    var modalInstance = $modal.open({
      templateUrl: '/partials/groupList/confirm-delete-group-modal',
      controller: confirmDeleteGroupCtrl,
      resolve: {
        group: function () {
          return group;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.tableParams.reload();
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

  $scope.groupIsDisabled = function(group) {
    return group.disabled;
  }

  $scope.groupIsFull = function(group) {
    return group.members.length >= group.memberLimit
  }

  $scope.groupsDisabled = function() {
    return $scope.settings.disableGroups;
  };

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

  $scope.emailGroupReportToSelf = function() {
    groupService.emailGroupReportToSelf().$promise.then(function() {
      notifierService.notify('Group Report email sent');
      $scope.tableParams.reload();
    }, function(reason) {
      notifierService.error(reason);
    });
  }

  $scope.getSettings = function() {
    settingsService.getSettings().$promise.then(function(data) {
      $scope.settings = data;
    }, function(reason) {
      notifierService.error(reason);
    });
  }

  $scope.disableGroups = function(disable) {
    var settings = {};
    angular.copy($scope.settings, settings);
    settings.disableGroups = disable;
    settingsService.saveSettings(settings).then(function(data){
      $scope.settings = data;
    }, function(reason) {
      notifierService.error(reason);
    });
  };

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

  $scope.getSettings();
});

var confirmDeleteGroupCtrl = function($scope, $modalInstance, groupService, notifierService, group) {
  $scope.group = group;
  $scope.confirm = function () {
    groupService.deleteGroup(group).then(function() {
      notifierService.notify('Group \'' + group.title + '\' has been deleted');
    }, function(reason) {
      notifierService.error(reason);
    });
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}