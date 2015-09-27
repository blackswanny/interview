'use strict';

var interview = require('../interview.server.controller.js');

module.exports = function(app) {
  app.route('/api/interview/session').get(interview.getSession);
};
