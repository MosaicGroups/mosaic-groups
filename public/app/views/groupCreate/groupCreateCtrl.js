angular.module('app').controller('groupCreateCtrl', function($scope, notifierService) {
  $scope.frequencies = [
    {value: "weekly"},
    {value: "bi-weekly"},
    {value: "monthly"},
    {value: "various"}
  ];
  $scope.genderTypes = [
    {value: "men"},
    {value: "women"},
    {value: "co-ed"}
  ];
  $scope.daysOfTheWeek = [
    {value: "Sunday"},
    {value: "Monday"},
    {value: "Tuesday"},
    {value: "Wednesday"},
    {value: "Thursday"},
    {value: "Friday"},
    {value: "Saturday"}
  ]
  $scope.topics = [
    {value: "sports"},
    {value: "book/bible study"},
    {value: "food"},
    {value: "discussion"},
    {value: "hobby/interest(such as board games)"},
    {value: "service"},
    {value: "finance"}
  ];

  $scope.title = "";
  $scope.location = "";
  $scope.dayOfWeek = "";
  $scope.frequency = "";
  $scope.genderType = "";
  $scope.childcare = true;
  $scope.topic = [];

  $scope.createGroup = function() {
    notifierService.notify("not yet implementd")
  }
})
