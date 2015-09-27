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
                var Range = ace.require('ace/range').Range;
                Socket.on('codeMessage', function (code) {
                    if (code.action === 'insert') {
                        editor.moveCursorTo(code.start.row, code.start.column);
                        editor.insert(code.lines.join('\n'));
                        editor.gotoLine(code.start.row, code.start.column, true);
                    } else if (code.action === 'remove') {
                        var removeRange = new Range(code.start.row, code.start.column,
                            code.end.row, code.end.column);
                        var session = editor.getSession();
                        session.replace(removeRange, '');
                    }
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