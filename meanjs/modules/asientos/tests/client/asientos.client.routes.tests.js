(function () {
  'use strict';

  describe('Asientos Route Tests', function () {
    // Initialize global variables
    var $scope,
      AsientosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AsientosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AsientosService = _AsientosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('asientos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/asientos');
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
          AsientosController,
          mockAsiento;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('asientos.view');
          $templateCache.put('modules/asientos/client/views/view-asiento.client.view.html', '');

          // create mock Asiento
          mockAsiento = new AsientosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Asiento Name'
          });

          // Initialize Controller
          AsientosController = $controller('AsientosController as vm', {
            $scope: $scope,
            asientoResolve: mockAsiento
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:asientoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.asientoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            asientoId: 1
          })).toEqual('/asientos/1');
        }));

        it('should attach an Asiento to the controller scope', function () {
          expect($scope.vm.asiento._id).toBe(mockAsiento._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/asientos/client/views/view-asiento.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AsientosController,
          mockAsiento;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('asientos.create');
          $templateCache.put('modules/asientos/client/views/form-asiento.client.view.html', '');

          // create mock Asiento
          mockAsiento = new AsientosService();

          // Initialize Controller
          AsientosController = $controller('AsientosController as vm', {
            $scope: $scope,
            asientoResolve: mockAsiento
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.asientoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/asientos/create');
        }));

        it('should attach an Asiento to the controller scope', function () {
          expect($scope.vm.asiento._id).toBe(mockAsiento._id);
          expect($scope.vm.asiento._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/asientos/client/views/form-asiento.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AsientosController,
          mockAsiento;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('asientos.edit');
          $templateCache.put('modules/asientos/client/views/form-asiento.client.view.html', '');

          // create mock Asiento
          mockAsiento = new AsientosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Asiento Name'
          });

          // Initialize Controller
          AsientosController = $controller('AsientosController as vm', {
            $scope: $scope,
            asientoResolve: mockAsiento
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:asientoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.asientoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            asientoId: 1
          })).toEqual('/asientos/1/edit');
        }));

        it('should attach an Asiento to the controller scope', function () {
          expect($scope.vm.asiento._id).toBe(mockAsiento._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/asientos/client/views/form-asiento.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
