(function () {
  'use strict';

  angular
    .module('reservas')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Reservas',
      state: 'reservas',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'reservas', {
      title: 'List Reservas',
      state: 'reservas.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'reservas', {
      title: 'Create Reserva',
      state: 'reservas.create',
      roles: ['*']
    });
  }
}());
