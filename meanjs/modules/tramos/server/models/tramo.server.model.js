'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tramo Schema
 */
var TramoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Tramo name',
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

mongoose.model('Tramo', TramoSchema);
