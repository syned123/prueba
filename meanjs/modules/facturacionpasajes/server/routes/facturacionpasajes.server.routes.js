'use strict';

/**
 * Module dependencies
 */
var facturacionpasajesPolicy = require('../policies/facturacionpasajes.server.policy'),
  facturacionpasajes = require('../controllers/facturacionpasajes.server.controller');

module.exports = function(app) {
  // Facturacionpasajes Routes
  app.route('/api/facturacionpasajes').all(facturacionpasajesPolicy.isAllowed)
    .get(facturacionpasajes.list)
    .post(facturacionpasajes.create);

  app.route('/api/facturacionpasajes/:facturacionpasajeId').all(facturacionpasajesPolicy.isAllowed)
    .get(facturacionpasajes.read)
    .put(facturacionpasajes.update)
    .delete(facturacionpasajes.delete);

  // Finish by binding the Facturacionpasaje middleware
  app.param('facturacionpasajeId', facturacionpasajes.facturacionpasajeByID);
};
