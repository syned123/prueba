(function () {
  'use strict';

  describe('Viajes List Controller Tests', function () {
    // Initialize global variables
    var ViajesListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ViajesService,
      mockViaje;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ViajesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ViajesService = _ViajesService_;

      // create mock article
      mockViaje = new ViajesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Viaje Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Viajes List controller.
      ViajesListController = $controller('ViajesListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockViajeList;

      beforeEach(function () {
        mockViajeList = [mockViaje, mockViaje];
      });

      it('should send a GET request and return all Viajes', inject(function (ViajesService) {
        // Set POST response
        $httpBackend.expectGET('api/viajes').respond(mockViajeList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.viajes.length).toEqual(2);
        expect($scope.vm.viajes[0]).toEqual(mockViaje);
        expect($scope.vm.viajes[1]).toEqual(mockViaje);

      }));
    });
  });
}());
