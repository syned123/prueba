(function () {
  'use strict';

  angular
    .module('chofers')
    .controller('ChofersListController', ChofersListController);

  ChofersListController.$inject = ['ChofersService'];

  function ChofersListController(ChofersService) {
    var vm = this;

    vm.chofers = ChofersService.query();
  }
}());
