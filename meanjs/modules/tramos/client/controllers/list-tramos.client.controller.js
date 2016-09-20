(function () {
  'use strict';

  angular
    .module('tramos')
    .controller('TramosListController', TramosListController);

  TramosListController.$inject = ['TramosService'];

  function TramosListController(TramosService) {
    var vm = this;

    vm.tramos = TramosService.query();
  }
}());
