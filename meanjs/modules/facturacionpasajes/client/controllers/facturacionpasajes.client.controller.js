(function () {
  'use strict';

  // Facturacionpasajes controller
  angular
    .module('facturacionpasajes')
    .controller('FacturacionpasajesController', FacturacionpasajesController);

  FacturacionpasajesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'facturacionpasajeResolve', 'ViajesService'];

  function FacturacionpasajesController ($scope, $state, $window, Authentication, facturacionpasaje, ViajesService) {
    var vm = this;
    vm.viajes = ViajesService.query();
    vm.authentication = Authentication;
    vm.facturacionpasaje = facturacionpasaje;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.view = {
      selectField: function(field, status) {
        console.log(field, status);
        if (vm.fieldsCache.selected && field && field.field === vm.fieldsCache.selected.field) {
          vm.fieldsCache.selected = {};
          delete vm.fieldsCache.reserved[field.field];
          delete vm.fieldsCache.sold[field.field];
        }
        if (field && status) {
          if (status === 'sold') {
            vm.fieldsCache.sold[field.field] = true;
          } else if (status === 'reserved') {
            vm.fieldsCache.reserved[field.field] = true;
          }
        }
      }
    };
    vm.fieldsCache = {
      reserved: {},
      selected: {},
      sold: {}
    };
    $scope.estilo = {
      color: '#fff',
      backgroundColor: 'red'
    };
    // Remove existing Facturacionpasaje
    function remove() {
      if ($window.confirm('¿Estas seguro que quieres borrarlo?')) {
        vm.facturacionpasaje.$remove($state.go('facturacionpasajes.list'));
      }
    }

    // Save Facturacionpasaje
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.facturacionpasajeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.facturacionpasaje._id) {
        vm.facturacionpasaje.$update(successCallback, errorCallback);
      } else {
        vm.facturacionpasaje.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('facturacionpasajes.view', {
          facturacionpasajeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
