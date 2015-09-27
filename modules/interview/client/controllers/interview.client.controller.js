'use strict';

angular.module('interview').controller('InterviewController',
  function ($scope, $http, $rootScope, Socket) {
    $http.get('/api/interview/session').then(function(res) {
      console.debug('res.data', res.data);

      var session = OT.initSession(res.data.apiKey, res.data.sessionId);
      var props = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };

      session.on('streamCreated', function(event) {
        var elements = document.querySelectorAll('[data-subscriber]');
        for (var i = 0; i < elements.length; i++) {
          var element = elements.item(i);
          session.subscribe(event.stream, element, props);
        }
      });

      session.connect(res.data.token, function(err) {
        if (err) return console.error(err);
        var elements = document.querySelectorAll('[data-publisher]');
        for (var i = 0; i < elements.length; i++) {
          var element = elements.item(i);
          session.publish(element, props);
        }

      });
      if (!Socket.socket) {
        Socket.connect();
      }
      $scope.selectedTab = function (tab) {
        $rootScope.$broadcast('tabSelected', tab);
        Socket.emit('tabSelectedMessage', {
           tab: tab
        });
      };
      Socket.on('tabSelectedMessage', function (scope) {
        console.log(scope.tab);
      });
    });
  }
);
