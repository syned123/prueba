(function () {
  'use strict';

  // Facturacionpasajes controller
  angular
    .module('facturacionpasajes')
    .controller('FacturacionpasajesController', FacturacionpasajesController);

  FacturacionpasajesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'facturacionpasajeResolve'];

  function FacturacionpasajesController ($scope, $state, $window, Authentication, facturacionpasaje) {
    var vm = this;

    vm.authentication = Authentication;
    vm.facturacionpasaje = facturacionpasaje;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Facturacionpasaje
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
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
