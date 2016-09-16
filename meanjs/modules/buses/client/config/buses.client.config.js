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
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'buses', {
      title: 'List Buses',
      state: 'buses.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'buses', {
      title: 'Create Bus',
      state: 'buses.create',
      roles: ['user']
    });
  }
}());
