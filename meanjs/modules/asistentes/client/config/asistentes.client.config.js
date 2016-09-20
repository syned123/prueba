(function () {
  'use strict';

  angular
    .module('asistentes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Asistentes',
      state: 'asistentes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'asistentes', {
      title: 'List Asistentes',
      state: 'asistentes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'asistentes', {
      title: 'Create Asistente',
      state: 'asistentes.create',
      roles: ['user']
    });
  }
}());
