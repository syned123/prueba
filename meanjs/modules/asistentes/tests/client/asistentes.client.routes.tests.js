(function () {
  'use strict';

  describe('Asistentes Route Tests', function () {
    // Initialize global variables
    var $scope,
      AsistentesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AsistentesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AsistentesService = _AsistentesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('asistentes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/asistentes');
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
          AsistentesController,
          mockAsistente;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('asistentes.view');
          $templateCache.put('modules/asistentes/client/views/view-asistente.client.view.html', '');

          // create mock Asistente
          mockAsistente = new AsistentesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Asistente Name'
          });

          // Initialize Controller
          AsistentesController = $controller('AsistentesController as vm', {
            $scope: $scope,
            asistenteResolve: mockAsistente
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:asistenteId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.asistenteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            asistenteId: 1
          })).toEqual('/asistentes/1');
        }));

        it('should attach an Asistente to the controller scope', function () {
          expect($scope.vm.asistente._id).toBe(mockAsistente._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/asistentes/client/views/view-asistente.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AsistentesController,
          mockAsistente;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('asistentes.create');
          $templateCache.put('modules/asistentes/client/views/form-asistente.client.view.html', '');

          // create mock Asistente
          mockAsistente = new AsistentesService();

          // Initialize Controller
          AsistentesController = $controller('AsistentesController as vm', {
            $scope: $scope,
            asistenteResolve: mockAsistente
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.asistenteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/asistentes/create');
        }));

        it('should attach an Asistente to the controller scope', function () {
          expect($scope.vm.asistente._id).toBe(mockAsistente._id);
          expect($scope.vm.asistente._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/asistentes/client/views/form-asistente.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AsistentesController,
          mockAsistente;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('asistentes.edit');
          $templateCache.put('modules/asistentes/client/views/form-asistente.client.view.html', '');

          // create mock Asistente
          mockAsistente = new AsistentesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Asistente Name'
          });

          // Initialize Controller
          AsistentesController = $controller('AsistentesController as vm', {
            $scope: $scope,
            asistenteResolve: mockAsistente
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:asistenteId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.asistenteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            asistenteId: 1
          })).toEqual('/asistentes/1/edit');
        }));

        it('should attach an Asistente to the controller scope', function () {
          expect($scope.vm.asistente._id).toBe(mockAsistente._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/asistentes/client/views/form-asistente.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
