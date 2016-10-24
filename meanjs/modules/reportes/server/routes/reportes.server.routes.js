'use strict';

/**
 * Module dependencies
 */
var reportesPolicy = require('../policies/reportes.server.policy'),
  reportes = require('../controllers/reportes.server.controller');

module.exports = function(app) {
  // Reportes Routes
  app.route('/api/reportes').all(reportesPolicy.isAllowed)
    .get(reportes.list)
    .post(reportes.create);

  app.route('/api/reportes/:reporteId').all(reportesPolicy.isAllowed)
    .get(reportes.read)
    .put(reportes.update)
    .delete(reportes.delete);

  // Finish by binding the Reporte middleware
  app.param('reporteId', reportes.reporteByID);
};
