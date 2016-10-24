(function () {
  'use strict';

  angular
    .module('reportes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('reportes', {
        abstract: true,
        url: '/reportes',
        template: '<ui-view/>'
      })
      .state('reportes.list', {
        url: '',
        templateUrl: 'modules/reportes/client/views/list-reportes.client.view.html',
        controller: 'ReportesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reportes List'
        }
      })
      .state('reportes.create', {
        url: '/create',
        templateUrl: 'modules/reportes/client/views/form-reporte.client.view.html',
        controller: 'ReportesController',
        controllerAs: 'vm',
        resolve: {
          reporteResolve: newReporte
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Reportes Create'
        }
      })
      .state('reportes.edit', {
        url: '/:reporteId/edit',
        templateUrl: 'modules/reportes/client/views/form-reporte.client.view.html',
        controller: 'ReportesController',
        controllerAs: 'vm',
        resolve: {
          reporteResolve: getReporte
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Reporte {{ reporteResolve.name }}'
        }
      })
      .state('reportes.view', {
        url: '/:reporteId',
        templateUrl: 'modules/reportes/client/views/view-reporte.client.view.html',
        controller: 'ReportesController',
        controllerAs: 'vm',
        resolve: {
          reporteResolve: getReporte
        },
        data: {
          pageTitle: 'Reporte {{ reporteResolve.name }}'
        }
      });
  }

  getReporte.$inject = ['$stateParams', 'ReportesService'];

  function getReporte($stateParams, ReportesService) {
    return ReportesService.get({
      reporteId: $stateParams.reporteId
    }).$promise;
  }

  newReporte.$inject = ['ReportesService'];

  function newReporte(ReportesService) {
    return new ReportesService();
  }
}());
