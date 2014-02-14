angular.module('app').value('moToastr', toastr);

angular.module('app').factory('moNotifier', function(moToastr) {
  return {
    notify: function(msg) {
      moToastr.success(msg);
      console.log(msg);
    }
  }
})