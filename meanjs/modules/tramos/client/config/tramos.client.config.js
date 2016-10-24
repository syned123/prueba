(function () {
  'use strict';

  angular
    .module('tramos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Tramos',
      state: 'tramos',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'tramos', {
      title: 'Lista de Tramos',
      state: 'tramos.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'tramos', {
      title: 'Crear Tramo',
      state: 'tramos.create',
      roles: ['user']
    });
  }
}());
