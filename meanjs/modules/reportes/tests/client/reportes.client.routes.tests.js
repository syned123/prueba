(function () {
  'use strict';

  describe('Reportes Route Tests', function () {
    // Initialize global variables
    var $scope,
      ReportesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ReportesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ReportesService = _ReportesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('reportes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/reportes');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ReportesController,
          mockReporte;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('reportes.view');
          $templateCache.put('modules/reportes/client/views/view-reporte.client.view.html', '');

          // create mock Reporte
          mockReporte = new ReportesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Reporte Name'
          });

          // Initialize Controller
          ReportesController = $controller('ReportesController as vm', {
            $scope: $scope,
            reporteResolve: mockReporte
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:reporteId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.reporteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            reporteId: 1
          })).toEqual('/reportes/1');
        }));

        it('should attach an Reporte to the controller scope', function () {
          expect($scope.vm.reporte._id).toBe(mockReporte._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/reportes/client/views/view-reporte.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ReportesController,
          mockReporte;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('reportes.create');
          $templateCache.put('modules/reportes/client/views/form-reporte.client.view.html', '');

          // create mock Reporte
          mockReporte = new ReportesService();

          // Initialize Controller
          ReportesController = $controller('ReportesController as vm', {
            $scope: $scope,
            reporteResolve: mockReporte
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.reporteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/reportes/create');
        }));

        it('should attach an Reporte to the controller scope', function () {
          expect($scope.vm.reporte._id).toBe(mockReporte._id);
          expect($scope.vm.reporte._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/reportes/client/views/form-reporte.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ReportesController,
          mockReporte;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('reportes.edit');
          $templateCache.put('modules/reportes/client/views/form-reporte.client.view.html', '');

          // create mock Reporte
          mockReporte = new ReportesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Reporte Name'
          });

          // Initialize Controller
          ReportesController = $controller('ReportesController as vm', {
            $scope: $scope,
            reporteResolve: mockReporte
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:reporteId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.reporteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            reporteId: 1
          })).toEqual('/reportes/1/edit');
        }));

        it('should attach an Reporte to the controller scope', function () {
          expect($scope.vm.reporte._id).toBe(mockReporte._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/reportes/client/views/form-reporte.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
