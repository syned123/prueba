(function () {
  'use strict';

  // Clientes controller
  angular
    .module('clientes')
    .controller('ClientesController', ClientesController);

  ClientesController.$inject = ['$scope', '$http', '$state', '$window', 'Authentication', 'clienteResolve'];

  function ClientesController ($scope, $http, $state, $window, Authentication, cliente) {
    var vm = this;
    vm.authentication = Authentication;
    vm.cliente = cliente;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Eliminar cliente existente
    function remove() {
      if ($window.confirm('¿Estas seguro que quieres borrarlo?')) {
        vm.cliente.$remove($state.go('clientes.list'));
      }
    }

    // Guardar cliente
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.clienteForm');
        return false;
      }

      // TODO: mover hacia la creación de la lógica / actualización para el servicio
      if (vm.cliente._id) {
        vm.cliente.$update(successCallback, errorCallback);
      } else {
        vm.cliente.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('clientes.view', {
          clienteId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
