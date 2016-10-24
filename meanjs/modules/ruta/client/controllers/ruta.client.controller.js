(function () {
  'use strict';

  // Ruta controller
  angular
    .module('ruta')
    .controller('RutaController', RutaController);

  RutaController.$inject = ['$scope', '$state', '$window', 'Authentication', 'rutumResolve'];

  function RutaController ($scope, $state, $window, Authentication, rutum, google) {
    var vm = this;
    vm.authentication = Authentication;
    vm.rutum = rutum;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
     // Remove existing Rutum
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.rutum.$remove($state.go('ruta.list'));
      }
    }

    // Save Rutum
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.rutumForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.rutum._id) {
        vm.rutum.$update(successCallback, errorCallback);
      } else {
        vm.rutum.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ruta.view', {
          rutumId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
