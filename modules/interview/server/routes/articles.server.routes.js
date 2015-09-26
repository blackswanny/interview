'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller');

module.exports = function (app) {
  app.route('/api/articles')
    .get(function (req, res) {
        res.json(req.article);
      });


};
