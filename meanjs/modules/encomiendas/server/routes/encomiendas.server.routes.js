'use strict';

/**
 * Module dependencies
 */
var encomiendasPolicy = require('../policies/encomiendas.server.policy'),
  encomiendas = require('../controllers/encomiendas.server.controller');

module.exports = function(app) {
  // Encomiendas Routes
  app.route('/api/encomiendas').all(encomiendasPolicy.isAllowed)
    .get(encomiendas.list)
    .post(encomiendas.create);

  app.route('/api/encomiendas/:encomiendaId').all(encomiendasPolicy.isAllowed)
    .get(encomiendas.read)
    .put(encomiendas.update)
    .delete(encomiendas.delete);

  // Finish by binding the Encomienda middleware
  app.param('encomiendaId', encomiendas.encomiendaByID);
};
