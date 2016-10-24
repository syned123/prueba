(function () {
  'use strict';

  angular
    .module('asientos')
    .controller('AsientosListController', AsientosListController);

  AsientosListController.$inject = ['AsientosService'];

  function AsientosListController(AsientosService) {
    var vm = this;

    vm.asientos = AsientosService.query();
  }
}());
