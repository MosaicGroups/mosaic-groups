angular.module('app').controller('groupCreateCtrl', function($scope, groupService, notifierService, identityService, userService) {
  // if the current user is an admin then they have the ability to create a group
  // and assign the leader as another person otherwise the group leader will be
  // set to the person who creates the group
  if (identityService.isAdmin()) {
    $scope.users = userService.getUsers();
    $scope.identity = identityService;
    $scope.leaderId = "";
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
    "Book/bible study",
    "Food",
    "Discussion",
    "Hobby/interest(such as board games)",
    "Service",
    "Finance"
  ];

  $scope.title = "";
  $scope.location = "";
  $scope.dayOfWeek = "";
  $scope.frequency = "";
  $scope.genderType = "";
  $scope.childcare = true;
  $scope.topics = [];
  $scope.description = "";

  $scope.saveGroupDataAsNewGroup = function() {
    // if the form is valid then submit to the server
    if (groupCreateForm.checkValidity()) {
      var newGroupData = {
        title: $scope.title,
        leaders: [],
        location: $scope.location,
        dayOfTheWeek: $scope.dayOfTheWeek,
        frequency: $scope.frequency,
        genderType: $scope.genderType,
        childcare: $scope.childcare,
        topics: $scope.topics,
        description: $scope.description
      }
      if (identityService.isAdmin()) {
        newGroupData.leaders.push($scope.leaderId);
      }
      groupService.saveGroupDataAsNewGroup(newGroupData).then(function() {
        notifierService.notify('Group ' + newGroupData.title + ' has been created');
      }, function(reason) {
        notifierService.error(reason);
      })
    }
  }
});
