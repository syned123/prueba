// Encomiendas service used to communicate Encomiendas REST endpoints
(function () {
  'use strict';

  angular
    .module('encomiendas')
    .factory('EncomiendasService', EncomiendasService);

  EncomiendasService.$inject = ['$resource'];

  function EncomiendasService($resource) {
    return $resource('api/encomiendas/:encomiendaId', {
      encomiendaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
