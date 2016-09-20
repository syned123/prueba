(function () {
  'use strict';

  angular
    .module('viajes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('viajes', {
        abstract: true,
        url: '/viajes',
        template: '<ui-view/>'
      })
      .state('viajes.list', {
        url: '',
        templateUrl: 'modules/viajes/client/views/list-viajes.client.view.html',
        controller: 'ViajesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Viajes List'
        }
      })
      .state('viajes.create', {
        url: '/create',
        templateUrl: 'modules/viajes/client/views/form-viaje.client.view.html',
        controller: 'ViajesController',
        controllerAs: 'vm',
        resolve: {
          viajeResolve: newViaje
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Viajes Create'
        }
      })
      .state('viajes.edit', {
        url: '/:viajeId/edit',
        templateUrl: 'modules/viajes/client/views/form-viaje.client.view.html',
        controller: 'ViajesController',
        controllerAs: 'vm',
        resolve: {
          viajeResolve: getViaje
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Viaje {{ viajeResolve.name }}'
        }
      })
      .state('viajes.view', {
        url: '/:viajeId',
        templateUrl: 'modules/viajes/client/views/view-viaje.client.view.html',
        controller: 'ViajesController',
        controllerAs: 'vm',
        resolve: {
          viajeResolve: getViaje
        },
        data: {
          pageTitle: 'Viaje {{ viajeResolve.name }}'
        }
      });
  }

  getViaje.$inject = ['$stateParams', 'ViajesService'];

  function getViaje($stateParams, ViajesService) {
    return ViajesService.get({
      viajeId: $stateParams.viajeId
    }).$promise;
  }

  newViaje.$inject = ['ViajesService'];

  function newViaje(ViajesService) {
    return new ViajesService();
  }
}());
