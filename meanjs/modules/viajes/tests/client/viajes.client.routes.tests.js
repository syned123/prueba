(function () {
  'use strict';

  describe('Viajes Route Tests', function () {
    // Initialize global variables
    var $scope,
      ViajesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ViajesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ViajesService = _ViajesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('viajes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/viajes');
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
          ViajesController,
          mockViaje;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('viajes.view');
          $templateCache.put('modules/viajes/client/views/view-viaje.client.view.html', '');

          // create mock Viaje
          mockViaje = new ViajesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Viaje Name'
          });

          // Initialize Controller
          ViajesController = $controller('ViajesController as vm', {
            $scope: $scope,
            viajeResolve: mockViaje
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:viajeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.viajeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            viajeId: 1
          })).toEqual('/viajes/1');
        }));

        it('should attach an Viaje to the controller scope', function () {
          expect($scope.vm.viaje._id).toBe(mockViaje._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/viajes/client/views/view-viaje.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ViajesController,
          mockViaje;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('viajes.create');
          $templateCache.put('modules/viajes/client/views/form-viaje.client.view.html', '');

          // create mock Viaje
          mockViaje = new ViajesService();

          // Initialize Controller
          ViajesController = $controller('ViajesController as vm', {
            $scope: $scope,
            viajeResolve: mockViaje
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.viajeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/viajes/create');
        }));

        it('should attach an Viaje to the controller scope', function () {
          expect($scope.vm.viaje._id).toBe(mockViaje._id);
          expect($scope.vm.viaje._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/viajes/client/views/form-viaje.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ViajesController,
          mockViaje;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('viajes.edit');
          $templateCache.put('modules/viajes/client/views/form-viaje.client.view.html', '');

          // create mock Viaje
          mockViaje = new ViajesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Viaje Name'
          });

          // Initialize Controller
          ViajesController = $controller('ViajesController as vm', {
            $scope: $scope,
            viajeResolve: mockViaje
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:viajeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.viajeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            viajeId: 1
          })).toEqual('/viajes/1/edit');
        }));

        it('should attach an Viaje to the controller scope', function () {
          expect($scope.vm.viaje._id).toBe(mockViaje._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/viajes/client/views/form-viaje.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
