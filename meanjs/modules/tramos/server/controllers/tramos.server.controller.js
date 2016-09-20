'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Tramo = mongoose.model('Tramo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Tramo
 */
exports.create = function(req, res) {
  var tramo = new Tramo(req.body);
  tramo.user = req.user;

  tramo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tramo);
    }
  });
};

/**
 * Show the current Tramo
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var tramo = req.tramo ? req.tramo.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  tramo.isCurrentUserOwner = req.user && tramo.user && tramo.user._id.toString() === req.user._id.toString();

  res.jsonp(tramo);
};

/**
 * Update a Tramo
 */
exports.update = function(req, res) {
  var tramo = req.tramo;

  tramo = _.extend(tramo, req.body);

  tramo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tramo);
    }
  });
};

/**
 * Delete an Tramo
 */
exports.delete = function(req, res) {
  var tramo = req.tramo;

  tramo.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tramo);
    }
  });
};

/**
 * List of Tramos
 */
exports.list = function(req, res) {
  Tramo.find().sort('-created').populate('user', 'displayName').exec(function(err, tramos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tramos);
    }
  });
};

/**
 * Tramo middleware
 */
exports.tramoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Tramo is invalid'
    });
  }

  Tramo.findById(id).populate('user', 'displayName').exec(function (err, tramo) {
    if (err) {
      return next(err);
    } else if (!tramo) {
      return res.status(404).send({
        message: 'No Tramo with that identifier has been found'
      });
    }
    req.tramo = tramo;
    next();
  });
};
