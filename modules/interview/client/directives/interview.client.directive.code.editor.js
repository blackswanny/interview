// Create the 'chat' controller
'use strict';

angular.module('interview').directive('interviewCodeEditor', ['Socket',
        function ( Socket ) {
        return {
            restrict: 'E',
            templateUrl: 'modules/interview/views/interview.code.editor.client.view.html',
            link: function () {},
            controller: function () {
                var editor = ace.edit('codeEditor');
                editor.setTheme('ace/theme/monokai');
                editor.getSession().setMode('ace/mode/javascript');
                if (!Socket.socket) {
                    Socket.connect();
                }
                Socket.on('codeMessage', function (code) {
                    if (code.action === 'insert') {
                        editor.moveCursorTo(code.start.row, code.start.column);
                        editor.insert(code.lines.join('\n'));
                        editor.gotoLine(code.start.row, code.start.column, true);
                    }
                    //editor.removeLines();
                    console.log(code);
                    //editor.insert(code);
                });

                editor.getSession().on('change', function(e) {
                    if (editor.curOp && editor.curOp.command.name) {
                        Socket.emit('codeMessage', e);
                    }
                });

            }
        };
    }]
);