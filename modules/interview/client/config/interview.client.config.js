'use strict';

angular.module('interview').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Interview',
      state: 'interview'
    });
  }
]);
