'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Viaje = mongoose.model('Viaje'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Viaje
 */
exports.create = function(req, res) {
  var viaje = new Viaje(req.body);
  viaje.user = req.user;

  viaje.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(viaje);
    }
  });
};

/**
 * Show the current Viaje
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var viaje = req.viaje ? req.viaje.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  viaje.isCurrentUserOwner = req.user && viaje.user && viaje.user._id.toString() === req.user._id.toString();

  res.jsonp(viaje);
};

/**
 * Update a Viaje
 */
exports.update = function(req, res) {
  var viaje = req.viaje;

  viaje = _.extend(viaje, req.body);

  viaje.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(viaje);
    }
  });
};

/**
 * Delete an Viaje
 */
exports.delete = function(req, res) {
  var viaje = req.viaje;

  viaje.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(viaje);
    }
  });
};

/**
 * List of Viajes
 */
exports.list = function(req, res) {
  Viaje.find().sort('-created').populate('user', 'displayName').exec(function(err, viajes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(viajes);
    }
  });
};

/**
 * Viaje middleware
 */
exports.viajeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Viaje is invalid'
    });
  }

  Viaje.findById(id).populate('user', 'displayName').exec(function (err, viaje) {
    if (err) {
      return next(err);
    } else if (!viaje) {
      return res.status(404).send({
        message: 'No Viaje with that identifier has been found'
      });
    }
    req.viaje = viaje;
    next();
  });
};
