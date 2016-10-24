'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Asiento = mongoose.model('Asiento'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Asiento
 */
exports.create = function(req, res) {
  var asiento = new Asiento(req.body);
  asiento.user = req.user;

  asiento.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asiento);
    }
  });
};

/**
 * Show the current Asiento
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var asiento = req.asiento ? req.asiento.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  asiento.isCurrentUserOwner = req.user && asiento.user && asiento.user._id.toString() === req.user._id.toString();

  res.jsonp(asiento);
};

/**
 * Update a Asiento
 */
exports.update = function(req, res) {
  var asiento = req.asiento;

  asiento = _.extend(asiento, req.body);

  asiento.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asiento);
    }
  });
};

/**
 * Delete an Asiento
 */
exports.delete = function(req, res) {
  var asiento = req.asiento;

  asiento.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asiento);
    }
  });
};

/**
 * List of Asientos
 */
exports.list = function(req, res) {
  Asiento.find().sort('-created').populate('user', 'displayName').exec(function(err, asientos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(asientos);
    }
  });
};

/**
 * Asiento middleware
 */
exports.asientoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Asiento is invalid'
    });
  }

  Asiento.findById(id).populate('user', 'displayName').exec(function (err, asiento) {
    if (err) {
      return next(err);
    } else if (!asiento) {
      return res.status(404).send({
        message: 'No Asiento with that identifier has been found'
      });
    }
    req.asiento = asiento;
    next();
  });
};
