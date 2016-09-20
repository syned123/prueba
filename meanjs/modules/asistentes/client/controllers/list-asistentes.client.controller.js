(function () {
  'use strict';

  angular
    .module('asistentes')
    .controller('AsistentesListController', AsistentesListController);

  AsistentesListController.$inject = ['AsistentesService'];

  function AsistentesListController(AsistentesService) {
    var vm = this;

    vm.asistentes = AsistentesService.query();
  }
}());
