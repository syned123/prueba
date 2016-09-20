(function () {
  'use strict';

  angular
    .module('viajes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Viajes',
      state: 'viajes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'viajes', {
      title: 'List Viajes',
      state: 'viajes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'viajes', {
      title: 'Create Viaje',
      state: 'viajes.create',
      roles: ['user']
    });
  }
}());
