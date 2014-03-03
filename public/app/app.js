angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngTable']);

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
    .when('/', { templateUrl: '/partials/home/home',
      controller: 'homeCtrl'
    })
    .when('/views/profile/profile', { templateUrl: '/partials/profile/profile',
      controller: 'profileCtrl', resolve: routeRoleChecks.user
    })
    .when('/views/groupCreateOrEdit/group-create-or-edit', { templateUrl: '/partials/groupCreateOrEdit/group-create-or-edit',
      controller: 'groupCreateOrEditCtrl', resolve: routeRoleChecks.user
    })
    .when('/views/groupCreateOrEdit/group-create-or-edit/:id', { templateUrl: '/partials/groupCreateOrEdit/group-create-or-edit',
      controller: 'groupCreateOrEditCtrl', resolve: routeRoleChecks.user
    })
    .when('/views/userEdit/user-edit/:id', { templateUrl: '/partials/userEdit/user-edit',
      controller: 'userEditCtrl', resolve: routeRoleChecks.admin
    })
    .when('/views/userList/user-list', { templateUrl: '/partials/userList/user-list',
      controller: 'userListCtrl', resolve: routeRoleChecks.admin
    })
    .when('/views/userCreate/user-create', { templateUrl: '/partials/userCreate/user-create',
      controller: 'userCreateCtrl', resolve: routeRoleChecks.admin
    })
    .when('/views/groupList/group-list', { templateUrl: '/partials/groupList/group-list',
      controller: 'groupListCtrl'
    })
    .when('/views/groupJoin/group-join/:id', { templateUrl: '/partials/groupJoin/group-join',
      controller: 'groupJoinCtrl'
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