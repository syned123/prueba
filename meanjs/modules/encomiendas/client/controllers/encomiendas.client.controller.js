(function () {
  'use strict';

  // Encomiendas controller
  angular
    .module('encomiendas')
    .controller('EncomiendasController', EncomiendasController);

  EncomiendasController.$inject = ['$scope', '$http', '$state', '$window', 'Authentication', 'encomiendaResolve', 'ViajesService'];

  function EncomiendasController ($scope, $http, $state, $window, Authentication, encomienda, ViajesService, clienteResolve) {
    var vm = this;
    vm.viajes = ViajesService.query();
    vm.authentication = Authentication;
    vm.encomienda = encomienda;
    vm.error = null;
    vm.cliente = {};
    vm.form = {};
    vm.enviar = {};
    vm.remove = remove;
    vm.save = save;
    $scope.enviar = function() {
      $http.post('http://localhost:3000/api/clientes', vm.cliente)
      .success(function(res) {
        console.log(res);
      });
    };
    // Remove existing Encomienda
    function remove() {
      if ($window.confirm('¿Estas seguro que quieres borrarlo?')) {
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
