'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Reserva = mongoose.model('Reserva'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Reserva
 */
exports.create = function(req, res) {
  var reserva = new Reserva(req.body);
  reserva.user = req.user;

  reserva.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reserva);
    }
  });
};

/**
 * Show the current Reserva
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var reserva = req.reserva ? req.reserva.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  reserva.isCurrentUserOwner = req.user && reserva.user && reserva.user._id.toString() === req.user._id.toString();

  res.jsonp(reserva);
};

/**
 * Update a Reserva
 */
exports.update = function(req, res) {
  var reserva = req.reserva;

  reserva = _.extend(reserva, req.body);

  reserva.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reserva);
    }
  });
};

/**
 * Delete an Reserva
 */
exports.delete = function(req, res) {
  var reserva = req.reserva;

  reserva.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reserva);
    }
  });
};

/**
 * List of Reservas
 */
exports.list = function(req, res) {
  Reserva.find().sort('-created').populate('user', 'displayName').exec(function(err, reservas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reservas);
    }
  });
};

/**
 * Reserva middleware
 */
exports.reservaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Reserva is invalid'
    });
  }

  Reserva.findById(id).populate('user', 'displayName').exec(function (err, reserva) {
    if (err) {
      return next(err);
    } else if (!reserva) {
      return res.status(404).send({
        message: 'No Reserva with that identifier has been found'
      });
    }
    req.reserva = reserva;
    next();
  });
};
