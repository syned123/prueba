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
  name: {
    type: String,
    default: '',
    required: 'Please fill Encomienda name',
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
