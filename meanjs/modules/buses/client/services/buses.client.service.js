// Buses service used to communicate Buses REST endpoints
(function () {
  'use strict';

  angular
    .module('buses')
    .factory('BusesService', BusesService);

  BusesService.$inject = ['$resource'];

  function BusesService($resource) {
    return $resource('api/buses/:busId', {
      busId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
