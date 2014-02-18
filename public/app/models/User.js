angular.module('app').factory('User', function($resource) {
  var User = $resource('/api/users/:id', {_id: "@_id"}, {
    update: {method:'PUT', isArray: false}
  });

  User.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }

  User.prototype.isSuperAdmin = function() {
    return this.roles && this.roles.indexOf('superadmin') > -1;
  }

  return User;
})