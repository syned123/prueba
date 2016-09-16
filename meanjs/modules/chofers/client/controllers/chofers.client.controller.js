(function () {
  'use strict';

  // Chofers controller
  angular
    .module('chofers')
    .controller('ChofersController', ChofersController);

  ChofersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'choferResolve'];

  function ChofersController ($scope, $state, $window, Authentication, chofer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.chofer = chofer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

      




    // Remove existing Chofer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.chofer.$remove($state.go('chofers.list'));
      }
    }

    // Save Chofer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.choferForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.chofer._id) {
        vm.chofer.$update(successCallback, errorCallback);
      } else {
        vm.chofer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('chofers.view', {
          choferId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
