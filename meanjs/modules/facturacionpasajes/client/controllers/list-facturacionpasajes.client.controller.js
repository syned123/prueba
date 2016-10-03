(function () {
  'use strict';

  angular
    .module('facturacionpasajes')
    .controller('FacturacionpasajesListController', FacturacionpasajesListController);

  FacturacionpasajesListController.$inject = ['FacturacionpasajesService'];

  function FacturacionpasajesListController(FacturacionpasajesService) {
    var vm = this;

    vm.facturacionpasajes = FacturacionpasajesService.query();
  }
}());
