'use strict';

angular.module('interview').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Start Interview',
      state: 'interview'
    });
  }
]);
