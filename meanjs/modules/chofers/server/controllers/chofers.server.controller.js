'use strict';
/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Chofer = mongoose.model('Chofer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
/**
 * Create a Chofer
 */
exports.create = function(req, res) {
  var chofer = new Chofer(req.body);
  chofer.user = req.user;
  chofer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(chofer);
    }
  });
};
/**
 * Show the current Chofer
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var chofer = req.chofer ? req.chofer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  chofer.isCurrentUserOwner = req.user && chofer.user && chofer.user._id.toString() === req.user._id.toString();

  res.jsonp(chofer);
};
/**
 * Update a Chofer
 */
exports.update = function(req, res) {
  var chofer = req.chofer;

  chofer = _.extend(chofer, req.body);

  chofer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(chofer);
    }
  });
};
/**
 * Delete an Chofer
 */
exports.delete = function(req, res) {
  var chofer = req.chofer;

  chofer.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(chofer);
    }
  });
};
/**
 * List of Chofers
 */
exports.list = function(req, res) {
  Chofer.find().sort('-created').populate('user', 'displayName').exec(function(err, chofers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(chofers);
    }
  });
};
/**
 * Chofer middleware
 */
exports.choferByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Chofer is invalid'
    });
  }
  Chofer.findById(id).populate('user', 'displayName').exec(function (err, chofer) {
    if (err) {
      return next(err);
    } else if (!chofer) {
      return res.status(404).send({
        message: 'No Chofer with that identifier has been found'
      });
    }
    req.chofer = chofer;
    next();
  });
};
