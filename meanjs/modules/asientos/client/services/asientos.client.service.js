// Asientos service used to communicate Asientos REST endpoints
(function () {
  'use strict';

  angular
    .module('asientos')
    .factory('AsientosService', AsientosService);

  AsientosService.$inject = ['$resource'];

  function AsientosService($resource) {
    return $resource('api/asientos/:asientoId', {
      asientoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
