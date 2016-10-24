(function () {
  'use strict';

  angular
    .module('reservas')
    .controller('ReservasListController', ReservasListController);

  ReservasListController.$inject = ['ReservasService'];

  function ReservasListController(ReservasService) {
    var vm = this;

    vm.reservas = ReservasService.query();
  }
}());
