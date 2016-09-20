// Tramos service used to communicate Tramos REST endpoints
(function () {
  'use strict';

  angular
    .module('tramos')
    .factory('TramosService', TramosService);

  TramosService.$inject = ['$resource'];

  function TramosService($resource) {
    return $resource('api/tramos/:tramoId', {
      tramoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
