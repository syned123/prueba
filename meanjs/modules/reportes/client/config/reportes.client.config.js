(function () {
  'use strict';

  angular
    .module('reportes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Reportes',
      state: 'reportes',
      type: 'dropdown',
      roles: ['']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'reportes', {
      title: 'List Reportes',
      state: 'reportes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'reportes', {
      title: 'Create Reporte',
      state: 'reportes.create',
      roles: ['']
    });
  }
}());
