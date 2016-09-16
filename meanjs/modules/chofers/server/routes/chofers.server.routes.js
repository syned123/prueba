'use strict';

/**
 * Module dependencies
 */
var chofersPolicy = require('../policies/chofers.server.policy'),
  chofers = require('../controllers/chofers.server.controller');

module.exports = function(app) {
  // Chofers Routes
  app.route('/api/chofers').all(chofersPolicy.isAllowed)
    .get(chofers.list)
    .post(chofers.create);

  app.route('/api/chofers/:choferId').all(chofersPolicy.isAllowed)
    .get(chofers.read)
    .put(chofers.update)
    .delete(chofers.delete);

  // Finish by binding the Chofer middleware
  app.param('choferId', chofers.choferByID);
};
