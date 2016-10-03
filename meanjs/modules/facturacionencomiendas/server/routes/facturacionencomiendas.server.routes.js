'use strict';

/**
 * Module dependencies
 */
var facturacionencomiendasPolicy = require('../policies/facturacionencomiendas.server.policy'),
  facturacionencomiendas = require('../controllers/facturacionencomiendas.server.controller');

module.exports = function(app) {
  // Facturacionencomiendas Routes
  app.route('/api/facturacionencomiendas').all(facturacionencomiendasPolicy.isAllowed)
    .get(facturacionencomiendas.list)
    .post(facturacionencomiendas.create);

  app.route('/api/facturacionencomiendas/:facturacionencomiendaId').all(facturacionencomiendasPolicy.isAllowed)
    .get(facturacionencomiendas.read)
    .put(facturacionencomiendas.update)
    .delete(facturacionencomiendas.delete);

  // Finish by binding the Facturacionencomienda middleware
  app.param('facturacionencomiendaId', facturacionencomiendas.facturacionencomiendaByID);
};
