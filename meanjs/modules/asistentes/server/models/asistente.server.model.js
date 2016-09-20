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
  name: {
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
