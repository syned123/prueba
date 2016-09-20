(function () {
  'use strict';

  angular
    .module('viajes')
    .controller('ViajesListController', ViajesListController);

  ViajesListController.$inject = ['ViajesService'];

  function ViajesListController(ViajesService) {
    var vm = this;

    vm.viajes = ViajesService.query();
  }
}());
