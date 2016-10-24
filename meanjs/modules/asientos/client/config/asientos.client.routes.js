(function () {
  'use strict';

  angular
    .module('asientos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('asientos', {
        abstract: true,
        url: '/asientos',
        template: '<ui-view/>'
      })
      .state('asientos.list', {
        url: '',
        templateUrl: 'modules/asientos/client/views/list-asientos.client.view.html',
        controller: 'AsientosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Asientos List'
        }
      })
      .state('asientos.create', {
        url: '/create',
        templateUrl: 'modules/asientos/client/views/form-asiento.client.view.html',
        controller: 'AsientosController',
        controllerAs: 'vm',
        resolve: {
          asientoResolve: newAsiento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Asientos Create'
        }
      })
      .state('asientos.edit', {
        url: '/:asientoId/edit',
        templateUrl: 'modules/asientos/client/views/form-asiento.client.view.html',
        controller: 'AsientosController',
        controllerAs: 'vm',
        resolve: {
          asientoResolve: getAsiento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Asiento {{ asientoResolve.name }}'
        }
      })
      .state('asientos.view', {
        url: '/:asientoId',
        templateUrl: 'modules/asientos/client/views/view-asiento.client.view.html',
        controller: 'AsientosController',
        controllerAs: 'vm',
        resolve: {
          asientoResolve: getAsiento
        },
        data: {
          pageTitle: 'Asiento {{ asientoResolve.name }}'
        }
      });
  }

  getAsiento.$inject = ['$stateParams', 'AsientosService'];

  function getAsiento($stateParams, AsientosService) {
    return AsientosService.get({
      asientoId: $stateParams.asientoId
    }).$promise;
  }

  newAsiento.$inject = ['AsientosService'];

  function newAsiento(AsientosService) {
    return new AsientosService();
  }
}());
