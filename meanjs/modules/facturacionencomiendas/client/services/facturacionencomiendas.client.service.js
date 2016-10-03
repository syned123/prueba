// Facturacionencomiendas service used to communicate Facturacionencomiendas REST endpoints
(function () {
  'use strict';

  angular
    .module('facturacionencomiendas')
    .factory('FacturacionencomiendasService', FacturacionencomiendasService);

  FacturacionencomiendasService.$inject = ['$resource'];

  function FacturacionencomiendasService($resource) {
    return $resource('api/facturacionencomiendas/:facturacionencomiendaId', {
      facturacionencomiendaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
