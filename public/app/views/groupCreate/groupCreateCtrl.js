angular.module('app').controller('groupCreateCtrl', function($scope, groupService, notifierService) {
  $scope.frequencies = [
    "weekly",
    "bi-weekly",
    "monthly",
    "various"
  ];
  $scope.genderTypes = [
    "men",
    "women",
    "co-ed"
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
    "sports",
    "book/bible study",
    "food",
    "discussion",
    "hobby/interest(such as board games)",
    "service",
    "finance"
  ];

  $scope.title = "";
  $scope.location = "";
  $scope.dayOfWeek = "";
  $scope.frequency = "";
  $scope.genderType = "";
  $scope.childcare = true;
  $scope.topics = [];

  $scope.saveGroupDataAsNewGroup = function() {
    // if the form is valid then submit to the server
    if (groupCreateForm.checkValidity()) {
      var newGroupData = {
        title: $scope.title,
        location: $scope.location,
        dayOfTheWeek: $scope.dayOfTheWeek,
        frequency: $scope.frequency,
        genderType: $scope.genderType,
        childcare: $scope.childcare,
        topics: $scope.topics
      }
      groupService.saveGroupDataAsNewGroup(newGroupData).then(function() {
        notifierService.notify('Group ' + newGroupData.title + ' has been created');
      }, function(reason) {
        notifierService.error(reason);
      })
    }
  }
});
