'use strict';

angular.module('interview').controller('InterviewController',
  function ($scope, $http, $rootScope) {
    $http.get('/api/interview/session').then(function(res) {
      console.debug('res.data', res.data);

      var session = OT.initSession(res.data.apiKey, res.data.sessionId);
      var props = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };

      console.debug('session', session);

      session.on('streamCreated', function(event) {
        console.debug('streamCreated', event);
        var elements = document.querySelectorAll('[data-subscriber]');
        for (var i = 0; i < elements.length; i++) {
          var element = elements.item(i);
          session.subscribe(event.stream, element, props);
        }
      });

      session.connect(res.data.token, function(err) {
        if (err) return console.error(err);

        session.publish('publisher', props);
      });
      
      $scope.selectedTab = function (tab) {
        $rootScope.$broadcast('tabSelected', tab);
      }
    });
  }
);
