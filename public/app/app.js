angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: { auth: function(authorizationService) {
      return authorizationService.authorizeAuthorizedUserForRoute('admin')
    }},
    user: { auth: function(authorizationService) {
      return authorizationService.authorizeAuthenticatedUserForRoute()
    }}
  }

  $locationProvider.html5Mode(true);

  // configure the available routes
  $routeProvider
    // home page
    .when('/', { templateUrl: '/partials/home/home',
      controller: 'homeCtrl'
    })
    // profile page (logged in users only)
    .when('/views/profile/profile', { templateUrl: '/partials/profile/profile',
      controller: 'profileCtrl', resolve: routeRoleChecks.user
    })
    // profile page (logged in users only)
    .when('/views/groupCreate/group-create', { templateUrl: '/partials/groupCreate/group-create',
      controller: 'groupCreateCtrl', resolve: routeRoleChecks.user
    })
    // list users page (admins only)
    .when('/views/userList/user-list', { templateUrl: '/partials/userList/user-list',
      controller: 'userListCtrl', resolve: routeRoleChecks.admin
    })
    // create users page (admins only)
    .when('/views/userCreate/user-create', { templateUrl: '/partials/userCreate/user-create',
      controller: 'userCreateCtrl', resolve: routeRoleChecks.admin
    });
});

/**
 * If any route is attempted that the user is not authorized for then send
 * the user back to the home page
 */
angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  });
});