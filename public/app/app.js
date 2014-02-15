angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(moAuth) {
      return moAuth.authorizeCurrentUserForRoute('admin')
    }}
  }

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main',
      controller: 'moMainCtrl'
    })
    .when('/admin/users', { templateUrl: '/partials/admin/user-list',
      controller: 'moUserListCtrl', resolve: routeRoleChecks.admin
    });
});

// runs after module is configured
angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  });
});