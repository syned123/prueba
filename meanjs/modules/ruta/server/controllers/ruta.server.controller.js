'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rutum = mongoose.model('Rutum'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Rutum
 */
exports.create = function(req, res) {
  var rutum = new Rutum(req.body);
  rutum.user = req.user;

  rutum.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rutum);
    }
  });
};

/**
 * Show the current Rutum
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var rutum = req.rutum ? req.rutum.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  rutum.isCurrentUserOwner = req.user && rutum.user && rutum.user._id.toString() === req.user._id.toString();

  res.jsonp(rutum);
};

/**
 * Update a Rutum
 */
exports.update = function(req, res) {
  var rutum = req.rutum;

  rutum = _.extend(rutum, req.body);

  rutum.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rutum);
    }
  });
};

/**
 * Delete an Rutum
 */
exports.delete = function(req, res) {
  var rutum = req.rutum;

  rutum.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rutum);
    }
  });
};

/**
 * List of Ruta
 */
exports.list = function(req, res) {
  Rutum.find().sort('-created').populate('user', 'displayName').exec(function(err, ruta) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ruta);
    }
  });
};

/**
 * Rutum middleware
 */
exports.rutumByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rutum is invalid'
    });
  }

  Rutum.findById(id).populate('user', 'displayName').exec(function (err, rutum) {
    if (err) {
      return next(err);
    } else if (!rutum) {
      return res.status(404).send({
        message: 'No Rutum with that identifier has been found'
      });
    }
    req.rutum = rutum;
    next();
  });
};
