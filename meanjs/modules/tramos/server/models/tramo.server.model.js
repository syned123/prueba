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
    required: 'Por favor, rellene el nombre Tramo',
    trim: true
  },
  inicio_tramo: {
    type: String,
    default: '',
    required: 'Por favor, rellene el inicio del Tramo',
    trim: true
  },
  final_tramo: {
    type: String,
    default: '',
    required: 'Por favor, rellene el inicio del Tramo',
    trim: true
  },
  duracion: {
    type: String,
    default: '',
    required: 'Por favor, rellene el inicio del Tramo',
    trim: true
  },
  kilometros: {
    type: String,
    default: '',
    required: 'Por favor, rellene el inicio del Tramo',
    trim: true
  },
  precio_dia: {
    type: String,
    default: '',
    required: 'Por favor, rellene el inicio del Tramo',
    trim: true
  },
  precio_noche: {
    type: String,
    default: '',
    required: 'Por favor, rellene el inicio del Tramo',
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
