'use strict';

angular.module('interview').controller('InterviewController',
  function ($scope, $http) {
    $http.get('/api/interview/session').then(res => {
      console.debug('res.data', res.data);

      var session = OT.initSession(res.data.apiKey, res.data.sessionId);
      var props = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };

      console.debug('session', session);

      session.on('streamCreated', event => {
        console.debug('streamCreated', event);

        session.subscribe(event.stream, 'subscriber', props);
      });

      session.connect(res.data.token, err => {
        if (err) return console.error(err);

        session.publish('publisher', props);
      });
    });
  }
);
