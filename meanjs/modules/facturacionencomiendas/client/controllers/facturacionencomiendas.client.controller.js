(function () {
  'use strict';

  // Facturacionencomiendas controller
  angular
    .module('facturacionencomiendas')
    .controller('FacturacionencomiendasController', FacturacionencomiendasController);

  FacturacionencomiendasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'facturacionencomiendaResolve'];

  function FacturacionencomiendasController ($scope, $state, $window, Authentication, facturacionencomienda) {
    var vm = this;

    vm.authentication = Authentication;
    vm.facturacionencomienda = facturacionencomienda;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Facturacionencomienda
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.facturacionencomienda.$remove($state.go('facturacionencomiendas.list'));
      }
    }

    // Save Facturacionencomienda
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.facturacionencomiendaForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.facturacionencomienda._id) {
        vm.facturacionencomienda.$update(successCallback, errorCallback);
      } else {
        vm.facturacionencomienda.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('facturacionencomiendas.view', {
          facturacionencomiendaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
