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
    unique: 'Nombre de tramo ya existe',
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
    required: 'Por favor, rellene el final del Tramo',
    trim: true
  },
  duracion: {
    type: String,
    default: '',
    required: 'Por favor, rellene el duracion del Tramo',
    trim: true
  },
  kilometros: {
    type: String,
    default: '',
    required: 'Por favor, rellene el kilometro del Tramo',
    trim: true
  },
  precio_dia: {
    type: String,
    default: '',
    required: 'Por favor, rellene el precio_dia del Tramo',
    trim: true
  },
  precio_noche: {
    type: String,
    default: '',
    required: 'Por favor, rellene el precio_noche del Tramo',
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
