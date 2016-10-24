(function () {
  'use strict';

  angular
    .module('ruta')
    .controller('RutaListController', RutaListController);

  RutaListController.$inject = ['RutaService'];

  function RutaListController(RutaService) {
    var vm = this;

    vm.ruta = RutaService.query();
  }
}());
