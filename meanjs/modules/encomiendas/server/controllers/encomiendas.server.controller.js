'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Encomienda = mongoose.model('Encomienda'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Encomienda
 */
exports.create = function(req, res) {
  var encomienda = new Encomienda(req.body);
  encomienda.user = req.user;

  encomienda.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(encomienda);
    }
  });
};

/**
 * Show the current Encomienda
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var encomienda = req.encomienda ? req.encomienda.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  encomienda.isCurrentUserOwner = req.user && encomienda.user && encomienda.user._id.toString() === req.user._id.toString();

  res.jsonp(encomienda);
};

/**
 * Update a Encomienda
 */
exports.update = function(req, res) {
  var encomienda = req.encomienda;

  encomienda = _.extend(encomienda, req.body);

  encomienda.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(encomienda);
    }
  });
};

/**
 * Delete an Encomienda
 */
exports.delete = function(req, res) {
  var encomienda = req.encomienda;

  encomienda.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(encomienda);
    }
  });
};

/**
 * List of Encomiendas
 */
exports.list = function(req, res) {
  Encomienda.find().sort('-created').populate('user', 'displayName').exec(function(err, encomiendas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(encomiendas);
    }
  });
};

/**
 * Encomienda middleware
 */
exports.encomiendaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Encomienda is invalid'
    });
  }

  Encomienda.findById(id).populate('user', 'displayName').exec(function (err, encomienda) {
    if (err) {
      return next(err);
    } else if (!encomienda) {
      return res.status(404).send({
        message: 'No Encomienda with that identifier has been found'
      });
    }
    req.encomienda = encomienda;
    next();
  });
};
