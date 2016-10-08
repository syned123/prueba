(function () {
  'use strict';

  // Encomiendas controller
  angular
    .module('encomiendas')
    .controller('EncomiendasController', EncomiendasController);

  EncomiendasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'encomiendaResolve', 'ViajesService'];

  function EncomiendasController ($scope, $state, $window, Authentication, encomienda, ViajesService) {
    var vm = this;
    vm.viajes = ViajesService.query();
    vm.authentication = Authentication;
    vm.encomienda = encomienda;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Encomienda
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.encomienda.$remove($state.go('encomiendas.list'));
      }
    }

    // Save Encomienda
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.encomiendaForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.encomienda._id) {
        vm.encomienda.$update(successCallback, errorCallback);
      } else {
        vm.encomienda.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('encomiendas.view', {
          encomiendaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
