'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Asistente = mongoose.model('Asistente'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Asistente
 */
exports.create = function(req, res) {
  var asistente = new Asistente(req.body);
  asistente.user = req.user;

  asistente.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asistente);
    }
  });
};

/**
 * Show the current Asistente
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var asistente = req.asistente ? req.asistente.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  asistente.isCurrentUserOwner = req.user && asistente.user && asistente.user._id.toString() === req.user._id.toString();

  res.jsonp(asistente);
};

/**
 * Update a Asistente
 */
exports.update = function(req, res) {
  var asistente = req.asistente;

  asistente = _.extend(asistente, req.body);

  asistente.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asistente);
    }
  });
};

/**
 * Delete an Asistente
 */
exports.delete = function(req, res) {
  var asistente = req.asistente;

  asistente.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asistente);
    }
  });
};

/**
 * List of Asistentes
 */
exports.list = function(req, res) {
  Asistente.find().sort('-created').populate('user', 'displayName').exec(function(err, asistentes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asistentes);
    }
  });
};

/**
 * Asistente middleware
 */
exports.asistenteByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Asistente is invalid'
    });
  }

  Asistente.findById(id).populate('user', 'displayName').exec(function (err, asistente) {
    if (err) {
      return next(err);
    } else if (!asistente) {
      return res.status(404).send({
        message: 'No Asistente with that identifier has been found'
      });
    }
    req.asistente = asistente;
    next();
  });
};
