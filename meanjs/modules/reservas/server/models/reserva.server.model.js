'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Reserva Schema
 */
var ReservaSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Reserva name',
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

mongoose.model('Reserva', ReservaSchema);
