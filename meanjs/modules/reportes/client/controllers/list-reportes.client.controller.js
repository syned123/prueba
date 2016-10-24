(function () {
  'use strict';

  angular
    .module('reportes')
    .controller('ReportesListController', ReportesListController);

  ReportesListController.$inject = ['ReportesService'];

  function ReportesListController(ReportesService) {
    var vm = this;

    vm.reportes = ReportesService.query();
  }
}());
