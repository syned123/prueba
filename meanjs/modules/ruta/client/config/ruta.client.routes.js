(function () {
  'use strict';

  angular
    .module('ruta')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ruta', {
        abstract: true,
        url: '/ruta',
        template: '<ui-view/>'
      })
      .state('ruta.list', {
        url: '',
        templateUrl: 'modules/ruta/client/views/list-ruta.client.view.html',
        controller: 'RutaListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ruta List'
        }
      })
      .state('ruta.create', {
        url: '/create',
        templateUrl: 'modules/ruta/client/views/form-rutum.client.view.html',
        controller: 'RutaController',
        controllerAs: 'vm',
        resolve: {
          rutumResolve: newRutum
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ruta Create'
        }
      })
      .state('ruta.edit', {
        url: '/:rutumId/edit',
        templateUrl: 'modules/ruta/client/views/form-rutum.client.view.html',
        controller: 'RutaController',
        controllerAs: 'vm',
        resolve: {
          rutumResolve: getRutum
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Rutum {{ rutumResolve.name }}'
        }
      })
      .state('ruta.view', {
        url: '/:rutumId',
        templateUrl: 'modules/ruta/client/views/view-rutum.client.view.html',
        controller: 'RutaController',
        controllerAs: 'vm',
        resolve: {
          rutumResolve: getRutum
        },
        data: {
          pageTitle: 'Rutum {{ rutumResolve.name }}'
        }
      });
  }

  getRutum.$inject = ['$stateParams', 'RutaService'];

  function getRutum($stateParams, RutaService) {
    return RutaService.get({
      rutumId: $stateParams.rutumId
    }).$promise;
  }

  newRutum.$inject = ['RutaService'];

  function newRutum(RutaService) {
    return new RutaService();
  }
}());
