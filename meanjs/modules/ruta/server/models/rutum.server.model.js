'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rutum Schema
 */
var RutumSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Rutum name',
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

mongoose.model('Rutum', RutumSchema);
