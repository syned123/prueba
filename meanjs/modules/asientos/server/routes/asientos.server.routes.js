'use strict';

/**
 * Module dependencies
 */
var asientosPolicy = require('../policies/asientos.server.policy'),
  asientos = require('../controllers/asientos.server.controller');

module.exports = function(app) {
  // Asientos Routes
  app.route('/api/asientos').all(asientosPolicy.isAllowed)
    .get(asientos.list)
    .post(asientos.create);

  app.route('/api/asientos/:asientoId').all(asientosPolicy.isAllowed)
    .get(asientos.read)
    .put(asientos.update)
    .delete(asientos.delete);

  // Finish by binding the Asiento middleware
  app.param('asientoId', asientos.asientoByID);
};
