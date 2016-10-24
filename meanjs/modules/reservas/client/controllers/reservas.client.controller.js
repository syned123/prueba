  (function () {
    'use strict';

  // Reservas controller
    angular
    .module('reservas')
    .controller('ReservasController', ReservasController);

    ReservasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'reservaResolve', 'AsientosService', 'ViajesService'];
    function ReservasController ($scope, $state, $window, Authentication, reserva, AsientosService, ViajesService) {
      var vm = this;
      vm.asientos = AsientosService.query();
      vm.viajes = ViajesService.query();
      vm.authentication = Authentication;
      vm.reserva = reserva;
      vm.error = null;
      vm.form = {};
      vm.remove = remove;
      vm.save = save;
      // Remove existing Reserva
      function remove() {
        if ($window.confirm('Are you sure you want to delete?')) {
          vm.reserva.$remove($state.go('reservas.list'));
        }
      }

      // Save Reserva
      function save(isValid) {
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.reservaForm');
          return false;
        }

        // TODO: move create/update logic to service
        if (vm.reserva._id) {
          vm.reserva.$update(successCallback, errorCallback);
        } else {
          vm.reserva.$save(successCallback, errorCallback);
        }

        function successCallback(res) {
          $state.go('reservas.view', {
            reservaId: res._id
          });
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }
    }
  }());
