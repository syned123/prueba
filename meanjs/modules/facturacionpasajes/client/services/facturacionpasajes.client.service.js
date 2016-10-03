// Facturacionpasajes service used to communicate Facturacionpasajes REST endpoints
(function () {
  'use strict';

  angular
    .module('facturacionpasajes')
    .factory('FacturacionpasajesService', FacturacionpasajesService);

  FacturacionpasajesService.$inject = ['$resource'];

  function FacturacionpasajesService($resource) {
    return $resource('api/facturacionpasajes/:facturacionpasajeId', {
      facturacionpasajeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
