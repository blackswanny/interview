// Create the 'chat' controller
'use strict';

angular.module('interview').directive('interviewChat', ['Socket', '$location', 'Authentication',
        function ( Socket, $location, Authentication ) {
        return {
            restrict: 'E',
            templateUrl: 'modules/interview/views/interview.chat.client.view.html',
            link: function () {},
            controller: function ($scope) {
                $scope.messages = [];
                if (!Authentication.user) {
                    $location.path('/');
                }

                // Make sure the Socket is connected
                if (!Socket.socket) {
                    Socket.connect();
                }

                // Add an event listener to the 'chatMessage' event
                Socket.on('interviewChatMessage', function (message) {
                    $scope.messages.unshift(message);
                });

                $scope.sendMessage = function () {
                    var message = {
                        text: this.messageText
                    };
                    Socket.emit('interviewChatMessage', message);
                    this.messageText = '';
                };

                // Remove the event listener when the controller instance is destroyed
                $scope.$on('$destroy', function () {
                    Socket.removeListener('interviewChatMessage');
                });

            }
        };
    }]
);