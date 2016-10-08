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
    required: 'Por favor introduzca horario del viaje',
    trim: true
  },
  destino: {
    type: String,
    default: '',
    required: 'Por favor introduzca destino del viaje',
    trim: true
  },
  turno_salida: {
    type: String,
    default: '',
    required: 'Por favor introduzca turno de salida  del viaje',
    trim: true
  },
  chofer: {
    type: String,
    default: '',
    required: 'Por favor introduzca el chofer del viaje',
    trim: true
  },
  bus: {
    type: String,
    default: '',
    required: 'Por favor introduzca el bus  del viaje',
    trim: true
  },
  asistente: {
    type: String,
    default: '',
    required: 'Por favor introduzca asistente del viaje',
    trim: true
  },
  tramo: {
    type: String,
    default: '',
    required: 'Por favor introduzca tramo  del viaje',
    trim: true
  },
  costo: {
    type: String,
    default: '',
    required: 'Por favor introduzca el costo',
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
