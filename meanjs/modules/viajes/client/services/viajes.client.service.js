// Viajes service used to communicate Viajes REST endpoints
(function () {
  'use strict';

  angular
    .module('viajes')
    .factory('ViajesService', ViajesService);

  ViajesService.$inject = ['$resource'];

  function ViajesService($resource) {
    return $resource('api/viajes/:viajeId', {
      viajeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
