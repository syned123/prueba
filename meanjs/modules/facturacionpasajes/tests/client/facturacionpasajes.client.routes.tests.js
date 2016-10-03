(function () {
  'use strict';

  describe('Facturacionpasajes Route Tests', function () {
    // Initialize global variables
    var $scope,
      FacturacionpasajesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FacturacionpasajesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FacturacionpasajesService = _FacturacionpasajesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('facturacionpasajes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/facturacionpasajes');
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
          FacturacionpasajesController,
          mockFacturacionpasaje;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('facturacionpasajes.view');
          $templateCache.put('modules/facturacionpasajes/client/views/view-facturacionpasaje.client.view.html', '');

          // create mock Facturacionpasaje
          mockFacturacionpasaje = new FacturacionpasajesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Facturacionpasaje Name'
          });

          // Initialize Controller
          FacturacionpasajesController = $controller('FacturacionpasajesController as vm', {
            $scope: $scope,
            facturacionpasajeResolve: mockFacturacionpasaje
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:facturacionpasajeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.facturacionpasajeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            facturacionpasajeId: 1
          })).toEqual('/facturacionpasajes/1');
        }));

        it('should attach an Facturacionpasaje to the controller scope', function () {
          expect($scope.vm.facturacionpasaje._id).toBe(mockFacturacionpasaje._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/facturacionpasajes/client/views/view-facturacionpasaje.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FacturacionpasajesController,
          mockFacturacionpasaje;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('facturacionpasajes.create');
          $templateCache.put('modules/facturacionpasajes/client/views/form-facturacionpasaje.client.view.html', '');

          // create mock Facturacionpasaje
          mockFacturacionpasaje = new FacturacionpasajesService();

          // Initialize Controller
          FacturacionpasajesController = $controller('FacturacionpasajesController as vm', {
            $scope: $scope,
            facturacionpasajeResolve: mockFacturacionpasaje
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.facturacionpasajeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/facturacionpasajes/create');
        }));

        it('should attach an Facturacionpasaje to the controller scope', function () {
          expect($scope.vm.facturacionpasaje._id).toBe(mockFacturacionpasaje._id);
          expect($scope.vm.facturacionpasaje._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/facturacionpasajes/client/views/form-facturacionpasaje.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FacturacionpasajesController,
          mockFacturacionpasaje;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('facturacionpasajes.edit');
          $templateCache.put('modules/facturacionpasajes/client/views/form-facturacionpasaje.client.view.html', '');

          // create mock Facturacionpasaje
          mockFacturacionpasaje = new FacturacionpasajesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Facturacionpasaje Name'
          });

          // Initialize Controller
          FacturacionpasajesController = $controller('FacturacionpasajesController as vm', {
            $scope: $scope,
            facturacionpasajeResolve: mockFacturacionpasaje
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:facturacionpasajeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.facturacionpasajeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            facturacionpasajeId: 1
          })).toEqual('/facturacionpasajes/1/edit');
        }));

        it('should attach an Facturacionpasaje to the controller scope', function () {
          expect($scope.vm.facturacionpasaje._id).toBe(mockFacturacionpasaje._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/facturacionpasajes/client/views/form-facturacionpasaje.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
