(function () {
  'use strict';

  angular
    .module('buses')
    .controller('BusesListController', BusesListController);

  BusesListController.$inject = ['BusesService'];

  function BusesListController(BusesService) {
    var vm = this;

    vm.buses = BusesService.query();
  }
}());
