'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Viaje Schema
 */
var ViajeSchema = new Schema({
  horario: {
    type: String,
    default: '',
    required: 'Por favor introduzca horario',
    trim: true
  },
  destino: {
    type: String,
    default: '',
    required: 'Por favor introduzca apellidos del cliente',
    trim: true
  },
  turno_salida: {
    type: String,
    default: '',
    required: 'Por favor introduzca apellidos del cliente',
    trim: true
  },
  bus: {
    type: String,
    ref: 'bus'
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

mongoose.model('Viaje', ViajeSchema);
