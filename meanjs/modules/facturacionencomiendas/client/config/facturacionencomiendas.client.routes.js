(function () {
  'use strict';

  angular
    .module('facturacionencomiendas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('facturacionencomiendas', {
        abstract: true,
        url: '/facturacionencomiendas',
        template: '<ui-view/>'
      })
      .state('facturacionencomiendas.list', {
        url: '',
        templateUrl: 'modules/facturacionencomiendas/client/views/list-facturacionencomiendas.client.view.html',
        controller: 'FacturacionencomiendasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Facturacionencomiendas List'
        }
      })
      .state('facturacionencomiendas.create', {
        url: '/create',
        templateUrl: 'modules/facturacionencomiendas/client/views/form-facturacionencomienda.client.view.html',
        controller: 'FacturacionencomiendasController',
        controllerAs: 'vm',
        resolve: {
          facturacionencomiendaResolve: newFacturacionencomienda
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Facturacionencomiendas Create'
        }
      })
      .state('facturacionencomiendas.edit', {
        url: '/:facturacionencomiendaId/edit',
        templateUrl: 'modules/facturacionencomiendas/client/views/form-facturacionencomienda.client.view.html',
        controller: 'FacturacionencomiendasController',
        controllerAs: 'vm',
        resolve: {
          facturacionencomiendaResolve: getFacturacionencomienda
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Facturacionencomienda {{ facturacionencomiendaResolve.name }}'
        }
      })
      .state('facturacionencomiendas.view', {
        url: '/:facturacionencomiendaId',
        templateUrl: 'modules/facturacionencomiendas/client/views/view-facturacionencomienda.client.view.html',
        controller: 'FacturacionencomiendasController',
        controllerAs: 'vm',
        resolve: {
          facturacionencomiendaResolve: getFacturacionencomienda
        },
        data: {
          pageTitle: 'Facturacionencomienda {{ facturacionencomiendaResolve.name }}'
        }
      });
  }

  getFacturacionencomienda.$inject = ['$stateParams', 'FacturacionencomiendasService'];

  function getFacturacionencomienda($stateParams, FacturacionencomiendasService) {
    return FacturacionencomiendasService.get({
      facturacionencomiendaId: $stateParams.facturacionencomiendaId
    }).$promise;
  }

  newFacturacionencomienda.$inject = ['FacturacionencomiendasService'];

  function newFacturacionencomienda(FacturacionencomiendasService) {
    return new FacturacionencomiendasService();
  }
}());
