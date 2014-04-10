angular.module('app').factory('notifierService', function(toastrService) {
  return {
    notify: function(msg) {
      toastrService.success(msg);
    },
    error: function(msg) {
      toastrService.error(msg);
    }
  }
})