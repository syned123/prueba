(function () {
  'use strict';

  angular
    .module('ruta')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Ruta',
      state: 'ruta',
      type: 'dropdown',
      roles: ['']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'ruta', {
      title: 'List Ruta',
      state: 'ruta.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'ruta', {
      title: 'Create Rutum',
      state: 'ruta.create',
      roles: ['']
    });
  }
}());
