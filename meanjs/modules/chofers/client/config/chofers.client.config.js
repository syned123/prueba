(function () {
  'use strict';
  angular
    .module('chofers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Choferes',
      state: 'chofers',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'chofers', {
      title: 'Lista Choferes',
      state: 'chofers.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'chofers', {
      title: 'Crear Chofer',
      state: 'chofers.create',
      roles: ['user']
    });
  }
}());
