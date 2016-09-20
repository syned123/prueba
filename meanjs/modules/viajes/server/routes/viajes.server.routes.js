'use strict';

/**
 * Module dependencies
 */
var viajesPolicy = require('../policies/viajes.server.policy'),
  viajes = require('../controllers/viajes.server.controller');

module.exports = function(app) {
  // Viajes Routes
  app.route('/api/viajes').all(viajesPolicy.isAllowed)
    .get(viajes.list)
    .post(viajes.create);

  app.route('/api/viajes/:viajeId').all(viajesPolicy.isAllowed)
    .get(viajes.read)
    .put(viajes.update)
    .delete(viajes.delete);

  // Finish by binding the Viaje middleware
  app.param('viajeId', viajes.viajeByID);
};
