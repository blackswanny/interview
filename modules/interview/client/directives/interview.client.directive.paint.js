// Create the 'chat' controller
'use strict';

angular.module('interview').directive('interviewPaint', ['Socket', function (Socket) {
        return {
            restrict: 'E',
            templateUrl: 'modules/interview/views/interview.paint.client.view.html',
            link: function () {},
            controller: function ($scope) {
                if (!Socket.socket) {
                    Socket.connect();
                }
                $scope.$on('tabSelected', function (event, tab) {
                    setTimeout(function () {
                        if (tab !== 'paint') {
                            return;
                        }
                        var canvas = document.querySelector('#paint');
                        var ctx = canvas.getContext('2d');
                        var sketch = document.querySelector('#sketch');
                        var sketch_style = getComputedStyle(sketch);
                        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
                        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
                        var mouse = {x: 0, y: 0};
                        canvas.addEventListener('mousemove', function(e) {
                            var offset = angular.element(this).offset();
                            mouse.x = e.pageX - offset.left;
                            mouse.y = e.pageY - offset.top;
                        }, false);
                        ctx.lineWidth = 5;
                        ctx.lineJoin = 'round';
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = 'black';
                        canvas.addEventListener('mousedown', function(e) {
                            ctx.beginPath();
                            ctx.moveTo(mouse.x, mouse.y);
                            canvas.addEventListener('mousemove', onPaint, false);
                            Socket.emit('paintBeginMessage', {
                                x: mouse.x,
                                y: mouse.y
                            });

                        }, false);
                        canvas.addEventListener('mouseup', function() {
                            canvas.removeEventListener('mousemove', onPaint, false);
                            Socket.emit('paintEndMessage',{});
                        }, false);
                        var onPaint = function() {
                            ctx.lineTo(mouse.x, mouse.y);
                            ctx.stroke();
                            Socket.emit('paintMoveMessage', {
                                x: mouse.x,
                                y: mouse.y
                            });
                        };

                        Socket.on('paintBeginMessage', function (paint) {
                            mouse.x = paint.x;
                            mouse.y = paint.y;
                            ctx.beginPath();
                            ctx.moveTo(mouse.x, mouse.y);
                        });
                        Socket.on('paintMoveMessage', function (paint) {
                            mouse.x = paint.x;
                            mouse.y = paint.y;
                            ctx.lineTo(mouse.x, mouse.y);
                            ctx.stroke();
                        });
                        Socket.on('paintEndMessage', function (paint) {
                            canvas.removeEventListener('mousemove', onPaint, false);
                        });


                    }, 100);
                });
            }
        };
    }]
);