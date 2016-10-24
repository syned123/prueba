(function () {
  'use strict';

  // Tramos controller
  angular
    .module('tramos')
    .controller('TramosController', TramosController);

  TramosController.$inject = ['$timeout', '$scope', '$state', '$window', 'Authentication', 'UsersService', 'tramoResolve', 'Upload'];

  function TramosController ($timeout, $scope, $state, $window, Authentication, UsersService, tramo, Upload) {
    var vm = this;

    vm.authentication = Authentication;
    vm.tramo = tramo;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.fileSelected = false;
    vm.updateUserProfile = updateUserProfile;

    function updateUserProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
    vm.upload = function (dataUrl, name) {
      vm.success = vm.error = null;

      Upload.upload({
        url: 'api/tramos/picture',
        data: {
          newProfilePicture: Upload.dataUrltoBlob(dataUrl, name)
        }
      }).then(function (response) {
        $timeout(function () {
          onSuccessItem(response.data);
        });
      }, function (response) {
        if (response.status > 0) onErrorItem(response.data);
      }, function (evt) {
        vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
      });
    };
    function onSuccessItem(response) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Reset form
      vm.fileSelected = false;
      vm.progress = 0;
    }
    // Remove existing Tramo
    function remove() {
      if ($window.confirm('Estas seguro que quieres borrarlo?')) {
        vm.tramo.$remove($state.go('tramos.list'));
      }
    }
    function onErrorItem(response) {
      vm.fileSelected = false;

      // Show error message
      vm.error = response.message;
    }

    // Save Tramo
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tramoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.tramo._id) {
        vm.tramo.$update(successCallback, errorCallback);
      } else {
        vm.tramo.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tramos.view', {
          tramoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
