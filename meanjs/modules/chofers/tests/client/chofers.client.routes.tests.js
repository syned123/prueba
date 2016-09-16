(function () {
  'use strict';

  describe('Chofers Route Tests', function () {
    // Initialize global variables
    var $scope,
      ChofersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ChofersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ChofersService = _ChofersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('chofers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/chofers');
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
          ChofersController,
          mockChofer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('chofers.view');
          $templateCache.put('modules/chofers/client/views/view-chofer.client.view.html', '');

          // create mock Chofer
          mockChofer = new ChofersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Chofer Name'
          });

          // Initialize Controller
          ChofersController = $controller('ChofersController as vm', {
            $scope: $scope,
            choferResolve: mockChofer
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:choferId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.choferResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            choferId: 1
          })).toEqual('/chofers/1');
        }));

        it('should attach an Chofer to the controller scope', function () {
          expect($scope.vm.chofer._id).toBe(mockChofer._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/chofers/client/views/view-chofer.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ChofersController,
          mockChofer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('chofers.create');
          $templateCache.put('modules/chofers/client/views/form-chofer.client.view.html', '');

          // create mock Chofer
          mockChofer = new ChofersService();

          // Initialize Controller
          ChofersController = $controller('ChofersController as vm', {
            $scope: $scope,
            choferResolve: mockChofer
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.choferResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/chofers/create');
        }));

        it('should attach an Chofer to the controller scope', function () {
          expect($scope.vm.chofer._id).toBe(mockChofer._id);
          expect($scope.vm.chofer._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/chofers/client/views/form-chofer.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ChofersController,
          mockChofer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('chofers.edit');
          $templateCache.put('modules/chofers/client/views/form-chofer.client.view.html', '');

          // create mock Chofer
          mockChofer = new ChofersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Chofer Name'
          });

          // Initialize Controller
          ChofersController = $controller('ChofersController as vm', {
            $scope: $scope,
            choferResolve: mockChofer
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:choferId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.choferResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            choferId: 1
          })).toEqual('/chofers/1/edit');
        }));

        it('should attach an Chofer to the controller scope', function () {
          expect($scope.vm.chofer._id).toBe(mockChofer._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/chofers/client/views/form-chofer.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
