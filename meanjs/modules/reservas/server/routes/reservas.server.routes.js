'use strict';

/**
 * Module dependencies
 */
var reservasPolicy = require('../policies/reservas.server.policy'),
  reservas = require('../controllers/reservas.server.controller');

module.exports = function(app) {
  // Reservas Routes
  app.route('/api/reservas').all(reservasPolicy.isAllowed)
    .get(reservas.list)
    .post(reservas.create);

  app.route('/api/reservas/:reservaId').all(reservasPolicy.isAllowed)
    .get(reservas.read)
    .put(reservas.update)
    .delete(reservas.delete);

  // Finish by binding the Reserva middleware
  app.param('reservaId', reservas.reservaByID);
};
