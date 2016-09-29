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
  nombre_cliente: {
    type: String,
    default: '',
    required: 'Por favor introduzca nombre del cliente',
    trim: true
  },
  apellidos_cliente: {
    type: String,
    default: '',
    required: 'Por favor introduzca apellidos del cliente',
    trim: true
  },
  ci_nit: {
    type: String,
    default: '',
    required: 'Por favor introduzca ci o nit del cliente',
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
