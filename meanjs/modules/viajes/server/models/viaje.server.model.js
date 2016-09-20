'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Viaje Schema
 */
var ViajeSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Viaje name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Viaje', ViajeSchema);
