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
  chofer: {
    type: Schema.ObjectId, ref:"chofers",
    default: '',
    required: 'Por favor introduzca apellidos del cliente',
    trim: true
  },
  asistente: {
    type: Schema.ObjectId, ref:"asistentes",
    default: '',
    required: 'Por favor introduzca apellidos del cliente',
    trim: true
  },
  bus: {
    type: Schema.ObjectId, ref:"buses",
    default: '',
    required: 'Por favor introduzca apellidos del cliente',
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

mongoose.model('Viaje', ViajeSchema);
