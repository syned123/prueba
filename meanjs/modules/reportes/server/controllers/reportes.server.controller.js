'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Reporte = mongoose.model('Reporte'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Reporte
 */
exports.create = function(req, res) {
  var reporte = new Reporte(req.body);
  reporte.user = req.user;

  reporte.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reporte);
    }
  });
};

/**
 * Show the current Reporte
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var reporte = req.reporte ? req.reporte.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  reporte.isCurrentUserOwner = req.user && reporte.user && reporte.user._id.toString() === req.user._id.toString();

  res.jsonp(reporte);
};

/**
 * Update a Reporte
 */
exports.update = function(req, res) {
  var reporte = req.reporte;

  reporte = _.extend(reporte, req.body);

  reporte.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reporte);
    }
  });
};

/**
 * Delete an Reporte
 */
exports.delete = function(req, res) {
  var reporte = req.reporte;

  reporte.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reporte);
    }
  });
};

/**
 * List of Reportes
 */
exports.list = function(req, res) {
  Reporte.find().sort('-created').populate('user', 'displayName').exec(function(err, reportes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reportes);
    }
  });
};

/**
 * Reporte middleware
 */
exports.reporteByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Reporte is invalid'
    });
  }

  Reporte.findById(id).populate('user', 'displayName').exec(function (err, reporte) {
    if (err) {
      return next(err);
    } else if (!reporte) {
      return res.status(404).send({
        message: 'No Reporte with that identifier has been found'
      });
    }
    req.reporte = reporte;
    next();
  });
};
