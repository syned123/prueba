(function () {
  'use strict';

  angular
    .module('facturacionpasajes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('facturacionpasajes', {
        abstract: true,
        url: '/facturacionpasajes',
        template: '<ui-view/>'
      })
      .state('facturacionpasajes.list', {
        url: '',
        templateUrl: 'modules/facturacionpasajes/client/views/list-facturacionpasajes.client.view.html',
        controller: 'FacturacionpasajesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Facturacionpasajes List'
        }
      })
      .state('facturacionpasajes.create', {
        url: '/create',
        templateUrl: 'modules/facturacionpasajes/client/views/form-facturacionpasaje.client.view.html',
        controller: 'FacturacionpasajesController',
        controllerAs: 'vm',
        resolve: {
          facturacionpasajeResolve: newFacturacionpasaje
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Facturacionpasajes Create'
        }
      })
      .state('facturacionpasajes.edit', {
        url: '/:facturacionpasajeId/edit',
        templateUrl: 'modules/facturacionpasajes/client/views/form-facturacionpasaje.client.view.html',
        controller: 'FacturacionpasajesController',
        controllerAs: 'vm',
        resolve: {
          facturacionpasajeResolve: getFacturacionpasaje
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Facturacionpasaje {{ facturacionpasajeResolve.name }}'
        }
      })
      .state('facturacionpasajes.view', {
        url: '/:facturacionpasajeId',
        templateUrl: 'modules/facturacionpasajes/client/views/view-facturacionpasaje.client.view.html',
        controller: 'FacturacionpasajesController',
        controllerAs: 'vm',
        resolve: {
          facturacionpasajeResolve: getFacturacionpasaje
        },
        data: {
          pageTitle: 'Facturacionpasaje {{ facturacionpasajeResolve.name }}'
        }
      });
  }

  getFacturacionpasaje.$inject = ['$stateParams', 'FacturacionpasajesService'];

  function getFacturacionpasaje($stateParams, FacturacionpasajesService) {
    return FacturacionpasajesService.get({
      facturacionpasajeId: $stateParams.facturacionpasajeId
    }).$promise;
  }

  newFacturacionpasaje.$inject = ['FacturacionpasajesService'];

  function newFacturacionpasaje(FacturacionpasajesService) {
    return new FacturacionpasajesService();
  }
}());
