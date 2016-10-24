(function () {
  'use strict';

  // Asientos controller
  angular
    .module('asientos')
    .controller('AsientosController', AsientosController);

  AsientosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'asientoResolve'];

  function AsientosController ($scope, $state, $window, Authentication, asiento) {
    var vm = this;

    vm.authentication = Authentication;
    vm.asiento = asiento;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Asiento
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.asiento.$remove($state.go('asientos.list'));
      }
    }

    // Save Asiento
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.asientoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.asiento._id) {
        vm.asiento.$update(successCallback, errorCallback);
      } else {
        vm.asiento.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('asientos.view', {
          asientoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
