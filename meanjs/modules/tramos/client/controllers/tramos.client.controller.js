(function () {
  'use strict';

  // Tramos controller
  angular
    .module('tramos')
    .controller('TramosController', TramosController);

  TramosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'tramoResolve'];

  function TramosController ($scope, $state, $window, Authentication, tramo) {
    var vm = this;

    vm.authentication = Authentication;
    vm.tramo = tramo;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Tramo
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.tramo.$remove($state.go('tramos.list'));
      }
    }

    // Save Tramo
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tramoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.tramo._id) {
        vm.tramo.$update(successCallback, errorCallback);
      } else {
        vm.tramo.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tramos.view', {
          tramoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
