angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(moAuth) {
      return moAuth.authorizeAuthorizedUserForRoute('admin')
    }},
    user: {auth: function(moAuth) {
      return moAuth.authorizeAuthenticatedUserForRoute()
    }}
  }

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main',
      controller: 'moMainCtrl'
    })
    .when('/admin/users', { templateUrl: '/partials/admin/user-list',
      controller: 'moUserListCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/user/create', { templateUrl: '/partials/admin/user-create',
      controller: 'moUserCreateCtrl', resolve: routeRoleChecks.admin
    })
    .when('/profile', { templateUrl: '/partials/account/profile',
      controller: 'moProfileCtrl', resolve: routeRoleChecks.user
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