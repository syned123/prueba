(function () {
  'use strict';

  angular
    .module('encomiendas')
    .controller('EncomiendasListController', EncomiendasListController);

  EncomiendasListController.$inject = ['EncomiendasService'];

  function EncomiendasListController(EncomiendasService) {
    var vm = this;

    vm.encomiendas = EncomiendasService.query();
  }
}());
