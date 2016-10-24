'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Asiento Schema
 */
var AsientoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Asiento name',
    trim: true
  }
});

mongoose.model('Asiento', AsientoSchema);
