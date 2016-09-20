(function () {
  'use strict';

  // Asistentes controller
  angular
    .module('asistentes')
    .controller('AsistentesController', AsistentesController);

  AsistentesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'asistenteResolve'];

  function AsistentesController ($scope, $state, $window, Authentication, asistente) {
    var vm = this;

    vm.authentication = Authentication;
    vm.asistente = asistente;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Asistente
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.asistente.$remove($state.go('asistentes.list'));
      }
    }

    // Save Asistente
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.asistenteForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.asistente._id) {
        vm.asistente.$update(successCallback, errorCallback);
      } else {
        vm.asistente.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('asistentes.view', {
          asistenteId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
