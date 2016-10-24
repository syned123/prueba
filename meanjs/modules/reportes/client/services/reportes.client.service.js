// Reportes service used to communicate Reportes REST endpoints
(function () {
  'use strict';

  angular
    .module('reportes')
    .factory('ReportesService', ReportesService);

  ReportesService.$inject = ['$resource'];

  function ReportesService($resource) {
    return $resource('api/reportes/:reporteId', {
      reporteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
