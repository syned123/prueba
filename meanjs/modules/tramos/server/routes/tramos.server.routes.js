'use strict';

/**
 * Module dependencies
 */
var tramosPolicy = require('../policies/tramos.server.policy'),
  tramos = require('../controllers/tramos.server.controller');

module.exports = function(app) {
  // Tramos Routes
  app.route('/api/tramos').all(tramosPolicy.isAllowed)
    .get(tramos.list)
    .post(tramos.create);

  app.route('/api/tramos/:tramoId').all(tramosPolicy.isAllowed)
    .get(tramos.read)
    .put(tramos.update)
    .delete(tramos.delete);

  // Finish by binding the Tramo middleware
  app.param('tramoId', tramos.tramoByID);
};
