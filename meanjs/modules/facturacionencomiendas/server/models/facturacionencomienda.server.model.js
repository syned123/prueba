'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Facturacionencomienda Schema
 */
var FacturacionencomiendaSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Facturacionencomienda name',
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

mongoose.model('Facturacionencomienda', FacturacionencomiendaSchema);
