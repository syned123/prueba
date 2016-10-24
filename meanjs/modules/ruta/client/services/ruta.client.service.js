// Ruta service used to communicate Ruta REST endpoints
(function () {
  'use strict';

  angular
    .module('ruta')
    .factory('RutaService', RutaService);

  RutaService.$inject = ['$resource'];

  function RutaService($resource) {
    return $resource('api/ruta/:rutumId', {
      rutumId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
