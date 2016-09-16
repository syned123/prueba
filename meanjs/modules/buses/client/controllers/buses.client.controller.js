(function () {
  'use strict';

  // Buses controller
  angular
    .module('buses')
    .controller('BusesController', BusesController);

  BusesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'busResolve'];

  function BusesController ($scope, $state, $window, Authentication, bus) {
    var vm = this;

    vm.authentication = Authentication;
    vm.bus = bus;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Bus
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bus.$remove($state.go('buses.list'));
      }
    }

    // Save Bus
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.busForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.bus._id) {
        vm.bus.$update(successCallback, errorCallback);
      } else {
        vm.bus.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('buses.view', {
          busId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
