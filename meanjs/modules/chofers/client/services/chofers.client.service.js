// Chofers service used to communicate Chofers REST endpoints
(function () {
  'use strict';

  angular
    .module('chofers')
    .factory('ChofersService', ChofersService);

  ChofersService.$inject = ['$resource'];

  function ChofersService($resource) {
    return $resource('api/chofers/:choferId', {
      choferId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
