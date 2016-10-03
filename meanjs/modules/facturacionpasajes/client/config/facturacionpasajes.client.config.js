(function () {
  'use strict';

  angular
    .module('facturacionpasajes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Venta pasajes',
      state: 'facturacionpasajes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'facturacionpasajes', {
      title: 'Lista pasajes',
      state: 'facturacionpasajes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'facturacionpasajes', {
      title: 'Crear pasaje',
      state: 'facturacionpasajes.create',
      roles: ['user']
    });
  }
}());
