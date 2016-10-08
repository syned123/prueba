(function () {
  'use strict';

  angular
    .module('encomiendas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('encomiendas', {
        abstract: true,
        url: '/encomiendas',
        template: '<ui-view/>'
      })
      .state('encomiendas.list', {
        url: '',
        templateUrl: 'modules/encomiendas/client/views/list-encomiendas.client.view.html',
        controller: 'EncomiendasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Encomiendas List'
        }
      })
      .state('encomiendas.create', {
        url: '/create',
        templateUrl: 'modules/encomiendas/client/views/form-encomienda.client.view.html',
        controller: 'EncomiendasController',
        controllerAs: 'vm',
        resolve: {
          encomiendaResolve: newEncomienda
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Encomiendas Create'
        }
      })
      .state('encomiendas.edit', {
        url: '/:encomiendaId/edit',
        templateUrl: 'modules/encomiendas/client/views/form-encomienda.client.view.html',
        controller: 'EncomiendasController',
        controllerAs: 'vm',
        resolve: {
          encomiendaResolve: getEncomienda
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Encomienda {{ encomiendaResolve.name }}'
        }
      })
      .state('encomiendas.view', {
        url: '/:encomiendaId',
        templateUrl: 'modules/encomiendas/client/views/view-encomienda.client.view.html',
        controller: 'EncomiendasController',
        controllerAs: 'vm',
        resolve: {
          encomiendaResolve: getEncomienda
        },
        data: {
          pageTitle: 'Encomienda {{ encomiendaResolve.name }}'
        }
      });
  }

  getEncomienda.$inject = ['$stateParams', 'EncomiendasService'];

  function getEncomienda($stateParams, EncomiendasService) {
    return EncomiendasService.get({
      encomiendaId: $stateParams.encomiendaId
    }).$promise;
  }

  newEncomienda.$inject = ['EncomiendasService'];

  function newEncomienda(EncomiendasService) {
    return new EncomiendasService();
  }
}());
