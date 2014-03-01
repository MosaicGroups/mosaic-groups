angular.module('app').controller('groupCreateOrEditCtrl', function($scope, $route, groupService, notifierService, identityService, userService) {
  var groupId = $route.current.params.id;
  $scope.identity = identityService;
  $scope.group = {};
  if (groupId) {
    groupService.getGroup($route.current.params.id).$promise.then(function(data) {
      $scope.group = data;
      $scope.group.leaderIds = [];
      for (var i = 0; i < data.leaders.length; i++) {
        $scope.group.leaderIds.push(data.leaders[i]._id);
      }
    });
  } else {
    $scope.group.title = "";
    $scope.group.location = "";
    $scope.group.dayOfWeek = "";
    $scope.group.frequency = "";
    $scope.group.genderType = "";
    $scope.group.childcare = true;
    $scope.group.topics = [];
    $scope.group.description = "";
    $scope.group.leaderIds = [];
  }

  // if the current user is an admin then they have the ability to create a group
  // and assign the leader as another person otherwise the group leader will be
  // set to the person who creates the group
  if (identityService.isAdmin()) {
    userService.getUsers().$promise.then(function(data) {
      $scope.users = [];
      for (var i = 0; i < data.length; i++) {
        $scope.users[i] = {};
        $scope.users[i].name = data[i].firstName + " " + data[i].lastName;
        $scope.users[i]._id = data[i]._id;
      }
    });
  }

  $scope.frequencies = [
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Various"
  ];
  $scope.genderTypes = [
    "Men",
    "Women",
    "Co-ed"
  ];
  $scope.daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  $scope.availableTopics = [
    "Sports",
    "Book/Bible Study",
    "Food",
    "Discussion",
    "Hobby/Interest",
    "Service",
    "Finance"
  ];

  $scope.saveGroup = function() {
    // if the form is valid then submit to the server
    if (groupCreateOrEditForm.checkValidity()) {
      $scope.group.leaders = [];
      if (identityService.isAdmin()) {
        for (var i = 0; i < $scope.group.leaderIds.length; i++) {
          $scope.group.leaders.push($scope.group.leaderIds[i]);
        }
      } else {
        $scope.group.leaders.push($scope.identity.currentUser._id);
      }
      groupService.saveGroup($scope.group).then(function() {
        if ($scope.group._id) {
          notifierService.notify('Group ' + $scope.group.title + ' has been updated');
        } else {
          notifierService.notify('Group ' + $scope.group.title + ' has been created');
        }
      }, function(reason) {
        notifierService.error(reason);
      })
    }
  }
});
