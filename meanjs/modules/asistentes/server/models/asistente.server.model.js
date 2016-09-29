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
  nombre_asistente: {
    type: String,
    default: '',
    required: 'Por favor introduzca nombre',
    trim: true
  },
  apellido_asistente: {
    type: String,
    default: '',
    required: 'Please fill Asistente name',
    trim: true
  },
  celular: {
    type: String,
    default: '',
    required: 'Please fill Asistente name',
    trim: true
  },
  direccion: {
    type: String,
    default: '',
    required: 'Please fill Asistente name',
    trim: true
  },
  edad: {
    type: String,
    default: '',
    required: 'Please fill Asistente name',
    trim: true
  },
  fecha_nacimiento: {
    type: String,
    default: '',
    required: 'Please fill Asistente name',
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
