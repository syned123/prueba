'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Facturacionpasaje = mongoose.model('Facturacionpasaje'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Facturacionpasaje
 */
exports.create = function(req, res) {
  var facturacionpasaje = new Facturacionpasaje(req.body);
  facturacionpasaje.user = req.user;

  facturacionpasaje.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionpasaje);
    }
  });
};

/**
 * Show the current Facturacionpasaje
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var facturacionpasaje = req.facturacionpasaje ? req.facturacionpasaje.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  facturacionpasaje.isCurrentUserOwner = req.user && facturacionpasaje.user && facturacionpasaje.user._id.toString() === req.user._id.toString();

  res.jsonp(facturacionpasaje);
};

/**
 * Update a Facturacionpasaje
 */
exports.update = function(req, res) {
  var facturacionpasaje = req.facturacionpasaje;

  facturacionpasaje = _.extend(facturacionpasaje, req.body);

  facturacionpasaje.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionpasaje);
    }
  });
};

/**
 * Delete an Facturacionpasaje
 */
exports.delete = function(req, res) {
  var facturacionpasaje = req.facturacionpasaje;

  facturacionpasaje.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionpasaje);
    }
  });
};

/**
 * List of Facturacionpasajes
 */
exports.list = function(req, res) {
  Facturacionpasaje.find().sort('-created').populate('user', 'displayName').exec(function(err, facturacionpasajes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facturacionpasajes);
    }
  });
};

/**
 * Facturacionpasaje middleware
 */
exports.facturacionpasajeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Facturacionpasaje is invalid'
    });
  }

  Facturacionpasaje.findById(id).populate('user', 'displayName').exec(function (err, facturacionpasaje) {
    if (err) {
      return next(err);
    } else if (!facturacionpasaje) {
      return res.status(404).send({
        message: 'No Facturacionpasaje with that identifier has been found'
      });
    }
    req.facturacionpasaje = facturacionpasaje;
    next();
  });
};
