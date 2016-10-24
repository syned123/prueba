'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Encomienda Schema
 */
var EncomiendaSchema = new Schema({
  fecha_salida: {
    type: String,
    default: '',
    required: 'Por favor introduzca la fecha de salida',
    trim: true
  },
  fecha_llegada: {
    type: String,
    default: '',
    required: 'Por favor introduzca la fecha de llegada',
    trim: true
  },
  viaje: {
    type: String,
    default: '',
    required: 'Por favor introduzca la fecha de llegada',
    trim: true
  },
  tipo_encomienda: {
    type: String,
    default: '',
    required: 'Por favor introduzca el tipo de Encomienda',
    trim: true
  },
  codigo_encomienda: {
    type: String,
    default: '',
    required: 'Por favor introduzca el codigo_encomienda',
    trim: true
  },
  ci_destinatario: {
    type: String,
    default: '',
    required: 'Por favor introduzca el ci_destinatario',
    trim: true
  },
  nombre_destinatario: {
    type: String,
    default: '',
    required: 'Por favor introduzca el nombre_destinatario',
    trim: true
  },
  apellidos_destinatario: {
    type: String,
    default: '',
    required: 'Por favor introduzca el apellidos_destinatario',
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

mongoose.model('Encomienda', EncomiendaSchema);
