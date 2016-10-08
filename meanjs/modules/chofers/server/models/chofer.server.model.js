'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Chofer Schema
 */
var ChoferSchema = new Schema({
  ci: {
    type: String,
    default: '',
    required: 'Please fill Chofer name',
    trim: true
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Chofer name',
    trim: true
  },
  last_name: {
    type: String,
    default: '',
    required: 'Please fill Chofer last_name',
    trim: true
  },
  cell_phone: {
    type: String,
    default: '',
    required: 'Please fill Chofer cell_phone',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill Chofer address',
    trim: true
  },
  age: {
    type: String,
    default: '',
    required: 'Please fill Chofer age',
    trim: true
  },
  birthdate: {
    type: String,
    default: '',
    required: 'Please fill Chofer birthdate',
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

mongoose.model('Chofer', ChoferSchema);
