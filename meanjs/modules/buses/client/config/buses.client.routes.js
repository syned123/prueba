(function () {
  'use strict';

  angular
    .module('buses')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('buses', {
        abstract: true,
        url: '/buses',
        template: '<ui-view/>'
      })
      .state('buses.list', {
        url: '',
        templateUrl: 'modules/buses/client/views/list-buses.client.view.html',
        controller: 'BusesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Buses List'
        }
      })
      .state('buses.create', {
        url: '/create',
        templateUrl: 'modules/buses/client/views/form-bus.client.view.html',
        controller: 'BusesController',
        controllerAs: 'vm',
        resolve: {
          busResolve: newBus
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Buses Create'
        }
      })
      .state('buses.edit', {
        url: '/:busId/edit',
        templateUrl: 'modules/buses/client/views/form-bus.client.view.html',
        controller: 'BusesController',
        controllerAs: 'vm',
        resolve: {
          busResolve: getBus
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Bus {{ busResolve.name }}'
        }
      })
      .state('buses.view', {
        url: '/:busId',
        templateUrl: 'modules/buses/client/views/view-bus.client.view.html',
        controller: 'BusesController',
        controllerAs: 'vm',
        resolve: {
          busResolve: getBus
        },
        data: {
          pageTitle: 'Bus {{ busResolve.name }}'
        }
      });
  }

  getBus.$inject = ['$stateParams', 'BusesService'];

  function getBus($stateParams, BusesService) {
    return BusesService.get({
      busId: $stateParams.busId
    }).$promise;
  }

  newBus.$inject = ['BusesService'];

  function newBus(BusesService) {
    return new BusesService();
  }
}());
