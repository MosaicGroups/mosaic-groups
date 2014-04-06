angular.module('app').directive('ngSize', function() {
  return {
    restrict:'A',
    scope: {
      ngSize: '@'
    },
    link: function(scope, elem, attrs) {
      angular.element(elem).attr('size', attrs['ngSize']);
    }
  };
});