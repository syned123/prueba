(function () {
  'use strict';

  angular
    .module('chofers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('chofers', {
        abstract: true,
        url: '/chofers',
        template: '<ui-view/>'
      })
      .state('chofers.list', {
        url: '',
        templateUrl: 'modules/chofers/client/views/list-chofers.client.view.html',
        controller: 'ChofersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Chofers List'
        }
      })
      .state('chofers.create', {
        url: '/create',
        templateUrl: 'modules/chofers/client/views/form-chofer.client.view.html',
        controller: 'ChofersController',
        controllerAs: 'vm',
        resolve: {
          choferResolve: newChofer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Chofers Create'
        }
      })
      .state('chofers.edit', {
        url: '/:choferId/edit',
        templateUrl: 'modules/chofers/client/views/form-chofer.client.view.html',
        controller: 'ChofersController',
        controllerAs: 'vm',
        resolve: {
          choferResolve: getChofer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Chofer {{ choferResolve.name }}'
        }
      })
      .state('chofers.view', {
        url: '/:choferId',
        templateUrl: 'modules/chofers/client/views/view-chofer.client.view.html',
        controller: 'ChofersController',
        controllerAs: 'vm',
        resolve: {
          choferResolve: getChofer
        },
        data: {
          pageTitle: 'Chofer {{ choferResolve.name }}'
        }
      });
  }

  getChofer.$inject = ['$stateParams', 'ChofersService'];

  function getChofer($stateParams, ChofersService) {
    return ChofersService.get({
      choferId: $stateParams.choferId
    }).$promise;
  }

  newChofer.$inject = ['ChofersService'];

  function newChofer(ChofersService) {
    return new ChofersService();
  }
}());
