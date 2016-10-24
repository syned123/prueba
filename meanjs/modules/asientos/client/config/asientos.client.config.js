(function () {
  'use strict';

  angular
    .module('asientos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Asientos',
      state: 'asientos',
      type: 'dropdown',
      roles: ['']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'asientos', {
      title: 'List Asientos',
      state: 'asientos.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'asientos', {
      title: 'Create Asiento',
      state: 'asientos.create',
      roles: ['']
    });
  }
}());
