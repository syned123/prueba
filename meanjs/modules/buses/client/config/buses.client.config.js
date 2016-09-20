(function () {
  'use strict';

  angular
    .module('buses')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Buses',
      state: 'buses',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'buses', {
      title: 'Lista de  Buses',
      state: 'buses.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'buses', {
      title: 'Crear Bus',
      state: 'buses.create',
      roles: ['user']
    });
  }
}());
