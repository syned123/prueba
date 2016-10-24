(function () {
  'use strict';

  angular
    .module('encomiendas')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Encomiendas',
      state: 'encomiendas',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'encomiendas', {
      title: 'Lista de Encomiendas',
      state: 'encomiendas.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'encomiendas', {
      title: 'Crear Encomienda',
      state: 'encomiendas.create',
      roles: ['user']
    });
  }
}());
