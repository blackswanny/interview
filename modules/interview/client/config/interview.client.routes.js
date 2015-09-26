'use strict';

angular.module('interview').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('interview', {
        url: '/interview',
        templateUrl: 'modules/interview/views/interview.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
