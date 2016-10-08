(function () {
  'use strict';

  describe('Encomiendas Route Tests', function () {
    // Initialize global variables
    var $scope,
      EncomiendasService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EncomiendasService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EncomiendasService = _EncomiendasService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('encomiendas');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/encomiendas');
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
          EncomiendasController,
          mockEncomienda;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('encomiendas.view');
          $templateCache.put('modules/encomiendas/client/views/view-encomienda.client.view.html', '');

          // create mock Encomienda
          mockEncomienda = new EncomiendasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Encomienda Name'
          });

          // Initialize Controller
          EncomiendasController = $controller('EncomiendasController as vm', {
            $scope: $scope,
            encomiendaResolve: mockEncomienda
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:encomiendaId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.encomiendaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            encomiendaId: 1
          })).toEqual('/encomiendas/1');
        }));

        it('should attach an Encomienda to the controller scope', function () {
          expect($scope.vm.encomienda._id).toBe(mockEncomienda._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/encomiendas/client/views/view-encomienda.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EncomiendasController,
          mockEncomienda;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('encomiendas.create');
          $templateCache.put('modules/encomiendas/client/views/form-encomienda.client.view.html', '');

          // create mock Encomienda
          mockEncomienda = new EncomiendasService();

          // Initialize Controller
          EncomiendasController = $controller('EncomiendasController as vm', {
            $scope: $scope,
            encomiendaResolve: mockEncomienda
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.encomiendaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/encomiendas/create');
        }));

        it('should attach an Encomienda to the controller scope', function () {
          expect($scope.vm.encomienda._id).toBe(mockEncomienda._id);
          expect($scope.vm.encomienda._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/encomiendas/client/views/form-encomienda.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EncomiendasController,
          mockEncomienda;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('encomiendas.edit');
          $templateCache.put('modules/encomiendas/client/views/form-encomienda.client.view.html', '');

          // create mock Encomienda
          mockEncomienda = new EncomiendasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Encomienda Name'
          });

          // Initialize Controller
          EncomiendasController = $controller('EncomiendasController as vm', {
            $scope: $scope,
            encomiendaResolve: mockEncomienda
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:encomiendaId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.encomiendaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            encomiendaId: 1
          })).toEqual('/encomiendas/1/edit');
        }));

        it('should attach an Encomienda to the controller scope', function () {
          expect($scope.vm.encomienda._id).toBe(mockEncomienda._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/encomiendas/client/views/form-encomienda.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
