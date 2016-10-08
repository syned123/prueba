(function () {
  'use strict';
  // Viajes controller
  angular
    .module('viajes')
    .controller('ViajesController', ViajesController);

  ViajesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'viajeResolve', 'ChofersService', 'BusesService', 'AsistentesService', 'TramosService'];

  function ViajesController ($scope, $state, $window, Authentication, viaje, ChofersService, BusesService, AsistentesService, TramosService) {
    var vm = this;
    vm.tramos = TramosService.query();
    vm.choferes = ChofersService.query();
    vm.buses = BusesService.query();
    vm.asistentes = AsistentesService.query();
    vm.authentication = Authentication;
    vm.viaje = viaje;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Viaje
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.viaje.$remove($state.go('viajes.list'));
      }
    }

    // Save Viaje
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.viajeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.viaje._id) {
        vm.viaje.$update(successCallback, errorCallback);
      } else {
        vm.viaje.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('viajes.view', {
          viajeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
