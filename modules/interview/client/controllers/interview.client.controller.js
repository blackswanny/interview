'use strict';

angular.module('interview').controller('InterviewController',
  function ($scope, $http) {
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

        session.subscribe(event.stream, 'subscriber', props);
      });

      session.connect(res.data.token, function(err) {
        if (err) return console.error(err);

        session.publish('publisher', props);
      });
      
      $scope.selectedTab = function () {
        console.log(arguments);
      }
    });
  }
);
