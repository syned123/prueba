'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Asistente Schema
 */
var AsistenteSchema = new Schema({
  ci: {
    type: String,
    default: '',
    required: 'Por favor introduzca celula_identidad',
    trim: true
  },
  nombre_asistente: {
    type: String,
    default: '',
    required: 'Por favor introduzca nombre',
    trim: true
  },
  apellido_asistente: {
    type: String,
    default: '',
    required: 'Por favor introduzca apellido_asistente',
    trim: true
  },
  celular: {
    type: String,
    default: '',
    required: 'Por favor introduzca celular',
    trim: true
  },
  direccion: {
    type: String,
    default: '',
    required: 'por favor introduzca direccion',
    trim: true
  },
  edad: {
    type: String,
    default: '',
    required: 'Por favor introduzca edad',
    trim: true
  },
  fecha_nacimiento: {
    type: String,
    default: '',
    required: 'Por favor introduzca fecha_nacimiento',
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

mongoose.model('Asistente', AsistenteSchema);
