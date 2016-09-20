(function () {
  'use strict';

  angular
    .module('asistentes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('asistentes', {
        abstract: true,
        url: '/asistentes',
        template: '<ui-view/>'
      })
      .state('asistentes.list', {
        url: '',
        templateUrl: 'modules/asistentes/client/views/list-asistentes.client.view.html',
        controller: 'AsistentesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Asistentes List'
        }
      })
      .state('asistentes.create', {
        url: '/create',
        templateUrl: 'modules/asistentes/client/views/form-asistente.client.view.html',
        controller: 'AsistentesController',
        controllerAs: 'vm',
        resolve: {
          asistenteResolve: newAsistente
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Asistentes Create'
        }
      })
      .state('asistentes.edit', {
        url: '/:asistenteId/edit',
        templateUrl: 'modules/asistentes/client/views/form-asistente.client.view.html',
        controller: 'AsistentesController',
        controllerAs: 'vm',
        resolve: {
          asistenteResolve: getAsistente
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Asistente {{ asistenteResolve.name }}'
        }
      })
      .state('asistentes.view', {
        url: '/:asistenteId',
        templateUrl: 'modules/asistentes/client/views/view-asistente.client.view.html',
        controller: 'AsistentesController',
        controllerAs: 'vm',
        resolve: {
          asistenteResolve: getAsistente
        },
        data: {
          pageTitle: 'Asistente {{ asistenteResolve.name }}'
        }
      });
  }

  getAsistente.$inject = ['$stateParams', 'AsistentesService'];

  function getAsistente($stateParams, AsistentesService) {
    return AsistentesService.get({
      asistenteId: $stateParams.asistenteId
    }).$promise;
  }

  newAsistente.$inject = ['AsistentesService'];

  function newAsistente(AsistentesService) {
    return new AsistentesService();
  }
}());
