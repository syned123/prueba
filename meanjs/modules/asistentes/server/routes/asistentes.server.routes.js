'use strict';

/**
 * Module dependencies
 */
var asistentesPolicy = require('../policies/asistentes.server.policy'),
  asistentes = require('../controllers/asistentes.server.controller');

module.exports = function(app) {
  // Asistentes Routes
  app.route('/api/asistentes').all(asistentesPolicy.isAllowed)
    .get(asistentes.list)
    .post(asistentes.create);

  app.route('/api/asistentes/:asistenteId').all(asistentesPolicy.isAllowed)
    .get(asistentes.read)
    .put(asistentes.update)
    .delete(asistentes.delete);

  // Finish by binding the Asistente middleware
  app.param('asistenteId', asistentes.asistenteByID);
};
