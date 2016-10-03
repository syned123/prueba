'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Facturacionpasaje Schema
 */
var FacturacionpasajeSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Facturacionpasaje name',
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

mongoose.model('Facturacionpasaje', FacturacionpasajeSchema);
