(function () {
  'use strict';

  angular
    .module('facturacionencomiendas')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Envio Encomiendas',
      state: 'facturacionencomiendas',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'facturacionencomiendas', {
      title: 'Lista Facturacion Encomiendas',
      state: 'facturacionencomiendas.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'facturacionencomiendas', {
      title: 'Crear Facturacion Encomienda',
      state: 'facturacionencomiendas.create',
      roles: ['user']
    });
  }
}());
