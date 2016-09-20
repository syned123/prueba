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
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'tramos', {
      title: 'List Tramos',
      state: 'tramos.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'tramos', {
      title: 'Create Tramo',
      state: 'tramos.create',
      roles: ['user']
    });
  }
}());
