'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cliente Schema
 */
var ClienteSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Cliente name',
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

mongoose.model('Cliente', ClienteSchema);
