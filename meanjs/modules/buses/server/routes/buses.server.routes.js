'use strict';

/**
 * Module dependencies
 */
var busesPolicy = require('../policies/buses.server.policy'),
  buses = require('../controllers/buses.server.controller');

module.exports = function(app) {
  // Buses Routes
  app.route('/api/buses').all(busesPolicy.isAllowed)
    .get(buses.list)
    .post(buses.create);

  app.route('/api/buses/:busId').all(busesPolicy.isAllowed)
    .get(buses.read)
    .put(buses.update)
    .delete(buses.delete);

  // Finish by binding the Bus middleware
  app.param('busId', buses.busByID);
};
