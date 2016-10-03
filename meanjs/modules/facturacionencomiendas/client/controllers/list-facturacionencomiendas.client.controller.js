(function () {
  'use strict';

  angular
    .module('facturacionencomiendas')
    .controller('FacturacionencomiendasListController', FacturacionencomiendasListController);

  FacturacionencomiendasListController.$inject = ['FacturacionencomiendasService'];

  function FacturacionencomiendasListController(FacturacionencomiendasService) {
    var vm = this;

    vm.facturacionencomiendas = FacturacionencomiendasService.query();
  }
}());
