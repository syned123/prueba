(function () {
  'use strict';

  angular
    .module('tramos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tramos', {
        abstract: true,
        url: '/tramos',
        template: '<ui-view/>'
      })
      .state('tramos.list', {
        url: '',
        templateUrl: 'modules/tramos/client/views/list-tramos.client.view.html',
        controller: 'TramosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tramos List'
        }
      })
      .state('tramos.create', {
        url: '/create',
        templateUrl: 'modules/tramos/client/views/form-tramo.client.view.html',
        controller: 'TramosController',
        controllerAs: 'vm',
        resolve: {
          tramoResolve: newTramo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Tramos Create'
        }
      })
      .state('tramos.edit', {
        url: '/:tramoId/edit',
        templateUrl: 'modules/tramos/client/views/form-tramo.client.view.html',
        controller: 'TramosController',
        controllerAs: 'vm',
        resolve: {
          tramoResolve: getTramo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Tramo {{ tramoResolve.name }}'
        }
      })
      .state('tramos.view', {
        url: '/:tramoId',
        templateUrl: 'modules/tramos/client/views/view-tramo.client.view.html',
        controller: 'TramosController',
        controllerAs: 'vm',
        resolve: {
          tramoResolve: getTramo
        },
        data: {
          pageTitle: 'Tramo {{ tramoResolve.name }}'
        }
      });
  }

  getTramo.$inject = ['$stateParams', 'TramosService'];

  function getTramo($stateParams, TramosService) {
    return TramosService.get({
      tramoId: $stateParams.tramoId
    }).$promise;
  }

  newTramo.$inject = ['TramosService'];

  function newTramo(TramosService) {
    return new TramosService();
  }
}());
