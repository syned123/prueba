// Asistentes service used to communicate Asistentes REST endpoints
(function () {
  'use strict';

  angular
    .module('asistentes')
    .factory('AsistentesService', AsistentesService);

  AsistentesService.$inject = ['$resource'];

  function AsistentesService($resource) {
    return $resource('api/asistentes/:asistenteId', {
      asistenteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
