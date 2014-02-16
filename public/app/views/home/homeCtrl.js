angular.module('app').controller('homeCtrl', function($scope) {
  $scope.groups = [
    { dayOfWeek: 'Monday', location: 'Halethorpe', semester: 'Spring 2014', name: 'All In' },
    { dayOfWeek: 'Monday', location: 'Regional', semester: 'Spring 2014', name: 'Coffee & Cocoa' },
    { dayOfWeek: 'Tuesday', location: 'Windsor Mill ***', semester: 'Spring 2014', name: 'Coffee & Crochet' },
    { dayOfWeek: 'Wednesday', location: 'Severn', semester: 'Spring 2014', name: 'Disappointment with God' },
    { dayOfWeek: 'Thursday', location: 'Pasadena', semester: 'Spring 2014', name: 'Made to Crave' },
    { dayOfWeek: 'Friday', location: 'Elkridge', semester: 'Spring 2014', name: 'Men\'s Group' },
    { dayOfWeek: 'Saturday', location: 'Glen Burnie ***', semester: 'Spring 2014', name: 'Fit: Game On' }
  ];
})