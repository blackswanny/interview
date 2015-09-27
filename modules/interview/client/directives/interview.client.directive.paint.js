// Create the 'chat' controller
'use strict';

angular.module('interview').directive('interviewPaint', function () {
        return {
            restrict: 'E',
            templateUrl: 'modules/interview/views/interview.paint.client.view.html',
            link: function () {},
            controller: function () {
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
                ctx.strokeStyle = 'blue';
                canvas.addEventListener('mousedown', function(e) {
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    canvas.addEventListener('mousemove', onPaint, false);
                }, false);

                canvas.addEventListener('mouseup', function() {
                    canvas.removeEventListener('mousemove', onPaint, false);
                }, false);
                var onPaint = function() {
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                };
            }
        };
    }
);