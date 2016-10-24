// Reservas service used to communicate Reservas REST endpoints
(function () {
  'use strict';

  angular
    .module('reservas')
    .factory('ReservasService', ReservasService);

  ReservasService.$inject = ['$resource'];

  function ReservasService($resource) {
    return $resource('api/reservas/:reservaId', {
      reservaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
