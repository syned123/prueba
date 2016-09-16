'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bus = mongoose.model('Bus'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Bus
 */
exports.create = function(req, res) {
  var bus = new Bus(req.body);
  bus.user = req.user;

  bus.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bus);
    }
  });
};

/**
 * Show the current Bus
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var bus = req.bus ? req.bus.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  bus.isCurrentUserOwner = req.user && bus.user && bus.user._id.toString() === req.user._id.toString();

  res.jsonp(bus);
};

/**
 * Update a Bus
 */
exports.update = function(req, res) {
  var bus = req.bus;

  bus = _.extend(bus, req.body);

  bus.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bus);
    }
  });
};

/**
 * Delete an Bus
 */
exports.delete = function(req, res) {
  var bus = req.bus;

  bus.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bus);
    }
  });
};

/**
 * List of Buses
 */
exports.list = function(req, res) {
  Bus.find().sort('-created').populate('user', 'displayName').exec(function(err, buses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(buses);
    }
  });
};

/**
 * Bus middleware
 */
exports.busByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bus is invalid'
    });
  }

  Bus.findById(id).populate('user', 'displayName').exec(function (err, bus) {
    if (err) {
      return next(err);
    } else if (!bus) {
      return res.status(404).send({
        message: 'No Bus with that identifier has been found'
      });
    }
    req.bus = bus;
    next();
  });
};
