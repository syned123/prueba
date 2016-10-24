(function () {
  'use strict';

  angular
    .module('clientes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Clientes',
      state: 'clientes',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'clientes', {
      title: 'Lista de Clientes',
      state: 'clientes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'clientes', {
      title: 'Crear Cliente',
      state: 'clientes.create',
      roles: ['user']
    });
  }
}());
