angular.module('app').factory('notifierService', function(toastrService) {
  return {
    notify: function(msg) {
      toastrService.success(msg);
      console.log(msg);
    },
    error: function(msg) {
      toastrService.error(msg);
      console.log(msg);
    }
  }
})