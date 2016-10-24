(function () {
  'use strict';

  describe('Reservas Route Tests', function () {
    // Initialize global variables
    var $scope,
      ReservasService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ReservasService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ReservasService = _ReservasService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('reservas');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/reservas');
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
          ReservasController,
          mockReserva;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('reservas.view');
          $templateCache.put('modules/reservas/client/views/view-reserva.client.view.html', '');

          // create mock Reserva
          mockReserva = new ReservasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Reserva Name'
          });

          // Initialize Controller
          ReservasController = $controller('ReservasController as vm', {
            $scope: $scope,
            reservaResolve: mockReserva
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:reservaId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.reservaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            reservaId: 1
          })).toEqual('/reservas/1');
        }));

        it('should attach an Reserva to the controller scope', function () {
          expect($scope.vm.reserva._id).toBe(mockReserva._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/reservas/client/views/view-reserva.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ReservasController,
          mockReserva;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('reservas.create');
          $templateCache.put('modules/reservas/client/views/form-reserva.client.view.html', '');

          // create mock Reserva
          mockReserva = new ReservasService();

          // Initialize Controller
          ReservasController = $controller('ReservasController as vm', {
            $scope: $scope,
            reservaResolve: mockReserva
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.reservaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/reservas/create');
        }));

        it('should attach an Reserva to the controller scope', function () {
          expect($scope.vm.reserva._id).toBe(mockReserva._id);
          expect($scope.vm.reserva._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/reservas/client/views/form-reserva.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ReservasController,
          mockReserva;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('reservas.edit');
          $templateCache.put('modules/reservas/client/views/form-reserva.client.view.html', '');

          // create mock Reserva
          mockReserva = new ReservasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Reserva Name'
          });

          // Initialize Controller
          ReservasController = $controller('ReservasController as vm', {
            $scope: $scope,
            reservaResolve: mockReserva
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:reservaId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.reservaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            reservaId: 1
          })).toEqual('/reservas/1/edit');
        }));

        it('should attach an Reserva to the controller scope', function () {
          expect($scope.vm.reserva._id).toBe(mockReserva._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/reservas/client/views/form-reserva.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
