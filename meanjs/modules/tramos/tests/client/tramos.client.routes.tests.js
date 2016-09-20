(function () {
  'use strict';

  describe('Tramos Route Tests', function () {
    // Initialize global variables
    var $scope,
      TramosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TramosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TramosService = _TramosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('tramos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/tramos');
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
          TramosController,
          mockTramo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('tramos.view');
          $templateCache.put('modules/tramos/client/views/view-tramo.client.view.html', '');

          // create mock Tramo
          mockTramo = new TramosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Tramo Name'
          });

          // Initialize Controller
          TramosController = $controller('TramosController as vm', {
            $scope: $scope,
            tramoResolve: mockTramo
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:tramoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.tramoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            tramoId: 1
          })).toEqual('/tramos/1');
        }));

        it('should attach an Tramo to the controller scope', function () {
          expect($scope.vm.tramo._id).toBe(mockTramo._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/tramos/client/views/view-tramo.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TramosController,
          mockTramo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('tramos.create');
          $templateCache.put('modules/tramos/client/views/form-tramo.client.view.html', '');

          // create mock Tramo
          mockTramo = new TramosService();

          // Initialize Controller
          TramosController = $controller('TramosController as vm', {
            $scope: $scope,
            tramoResolve: mockTramo
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.tramoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/tramos/create');
        }));

        it('should attach an Tramo to the controller scope', function () {
          expect($scope.vm.tramo._id).toBe(mockTramo._id);
          expect($scope.vm.tramo._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/tramos/client/views/form-tramo.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TramosController,
          mockTramo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('tramos.edit');
          $templateCache.put('modules/tramos/client/views/form-tramo.client.view.html', '');

          // create mock Tramo
          mockTramo = new TramosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Tramo Name'
          });

          // Initialize Controller
          TramosController = $controller('TramosController as vm', {
            $scope: $scope,
            tramoResolve: mockTramo
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:tramoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.tramoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            tramoId: 1
          })).toEqual('/tramos/1/edit');
        }));

        it('should attach an Tramo to the controller scope', function () {
          expect($scope.vm.tramo._id).toBe(mockTramo._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/tramos/client/views/form-tramo.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
