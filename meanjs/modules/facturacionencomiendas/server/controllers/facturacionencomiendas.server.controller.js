'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Facturacionencomienda = mongoose.model('Facturacionencomienda'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Facturacionencomienda
 */
exports.create = function(req, res) {
  var facturacionencomienda = new Facturacionencomienda(req.body);
  facturacionencomienda.user = req.user;

  facturacionencomienda.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionencomienda);
    }
  });
};

/**
 * Show the current Facturacionencomienda
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var facturacionencomienda = req.facturacionencomienda ? req.facturacionencomienda.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  facturacionencomienda.isCurrentUserOwner = req.user && facturacionencomienda.user && facturacionencomienda.user._id.toString() === req.user._id.toString();

  res.jsonp(facturacionencomienda);
};

/**
 * Update a Facturacionencomienda
 */
exports.update = function(req, res) {
  var facturacionencomienda = req.facturacionencomienda;

  facturacionencomienda = _.extend(facturacionencomienda, req.body);

  facturacionencomienda.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionencomienda);
    }
  });
};

/**
 * Delete an Facturacionencomienda
 */
exports.delete = function(req, res) {
  var facturacionencomienda = req.facturacionencomienda;

  facturacionencomienda.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionencomienda);
    }
  });
};

/**
 * List of Facturacionencomiendas
 */
exports.list = function(req, res) {
  Facturacionencomienda.find().sort('-created').populate('user', 'displayName').exec(function(err, facturacionencomiendas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionencomiendas);
    }
  });
};

/**
 * Facturacionencomienda middleware
 */
exports.facturacionencomiendaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Facturacionencomienda is invalid'
    });
  }

  Facturacionencomienda.findById(id).populate('user', 'displayName').exec(function (err, facturacionencomienda) {
    if (err) {
      return next(err);
    } else if (!facturacionencomienda) {
      return res.status(404).send({
        message: 'No Facturacionencomienda with that identifier has been found'
      });
    }
    req.facturacionencomienda = facturacionencomienda;
    next();
  });
};
