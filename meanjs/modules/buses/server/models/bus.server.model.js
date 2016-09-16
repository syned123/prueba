'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Bus Schema
 */
var BusSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Bus name',
    trim: true
  },
  color: {
    type: String,
    default: '',
    required: 'Please fill Bus color',
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

mongoose.model('Bus', BusSchema);
