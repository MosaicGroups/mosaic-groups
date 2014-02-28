angular.module('app').controller('groupEditCtrl', function($scope, $route, notifierService, groupService, userService, identityService) {
  $scope.identity = identityService;

  $scope.groupToEdit = groupService.getGroup($route.current.params.id);

  if (identityService.isAdmin()) {
    $scope.users = userService.getUsers();
    $scope.identity = identityService;
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

  $scope.saveGroup = function() {
    userService.saveGroup($scope.groupToEdit).then(function() {
      notifierService.notify('Group has been updated');
    }, function(reason) {
      notifierService.error(reason);
    })
  }
});
