'use strict';

angular.module('interview').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'interview',
      state: 'interview'
    });
  }
]);
