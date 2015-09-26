// Create the 'chat' controller
'use strict';

angular.module('interview').directive('interviewCodeEditor', function () {
        return {
            restrict: 'E',
            templateUrl: 'modules/interview/views/interview.code.editor.client.view.html',
            link: function () {},
            controller: function () {
                var editor = ace.edit("codeEditor");
                editor.setTheme("ace/theme/monokai");
                editor.getSession().setMode("ace/mode/javascript");
            }
        };
    }
);