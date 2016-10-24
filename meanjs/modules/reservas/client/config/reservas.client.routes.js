(function () {
  'use strict';

  angular
    .module('reservas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('reservas', {
        abstract: true,
        url: '/reservas',
        template: '<ui-view/>'
      })
      .state('reservas.list', {
        url: '',
        templateUrl: 'modules/reservas/client/views/list-reservas.client.view.html',
        controller: 'ReservasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reservas List'
        }
      })
      .state('reservas.create', {
        url: '/create',
        templateUrl: 'modules/reservas/client/views/form-reserva.client.view.html',
        controller: 'ReservasController',
        controllerAs: 'vm',
        resolve: {
          reservaResolve: newReserva
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Reservas Create'
        }
      })
      .state('reservas.edit', {
        url: '/:reservaId/edit',
        templateUrl: 'modules/reservas/client/views/form-reserva.client.view.html',
        controller: 'ReservasController',
        controllerAs: 'vm',
        resolve: {
          reservaResolve: getReserva
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Reserva {{ reservaResolve.name }}'
        }
      })
      .state('reservas.view', {
        url: '/:reservaId',
        templateUrl: 'modules/reservas/client/views/view-reserva.client.view.html',
        controller: 'ReservasController',
        controllerAs: 'vm',
        resolve: {
          reservaResolve: getReserva
        },
        data: {
          pageTitle: 'Reserva {{ reservaResolve.name }}'
        }
      });
  }

  getReserva.$inject = ['$stateParams', 'ReservasService'];

  function getReserva($stateParams, ReservasService) {
    return ReservasService.get({
      reservaId: $stateParams.reservaId
    }).$promise;
  }

  newReserva.$inject = ['ReservasService'];

  function newReserva(ReservasService) {
    return new ReservasService();
  }
}());
