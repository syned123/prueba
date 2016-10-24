'use strict';

/**
 * Module dependencies
 */
var rutaPolicy = require('../policies/ruta.server.policy'),
  ruta = require('../controllers/ruta.server.controller');

module.exports = function(app) {
  // Ruta Routes
  app.route('/api/ruta').all(rutaPolicy.isAllowed)
    .get(ruta.list)
    .post(ruta.create);

  app.route('/api/ruta/:rutumId').all(rutaPolicy.isAllowed)
    .get(ruta.read)
    .put(ruta.update)
    .delete(ruta.delete);

  // Finish by binding the Rutum middleware
  app.param('rutumId', ruta.rutumByID);
};
