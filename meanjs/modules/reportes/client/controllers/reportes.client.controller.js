(function () {
  'use strict';

  // Reportes controller
  angular
    .module('reportes')
    .controller('ReportesController', ReportesController);

  ReportesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'reporteResolve'];

  function ReportesController ($scope, $state, $window, Authentication, reporte) {
    var vm = this;

    vm.authentication = Authentication;
    vm.reporte = reporte;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Reporte
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.reporte.$remove($state.go('reportes.list'));
      }
    }

    // Save Reporte
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.reporteForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.reporte._id) {
        vm.reporte.$update(successCallback, errorCallback);
      } else {
        vm.reporte.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('reportes.view', {
          reporteId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
