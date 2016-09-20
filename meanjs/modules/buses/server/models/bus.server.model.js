'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Bus Schema
 */
var BusSchema = new Schema({
  placa: {
    type: String,
    default: '',
    required: 'Please fill Bus name',
    trim: true
  },
  color: {
    type: String,
    default: '',
    required: 'Please fill Bus color',
    trim: true
  },
  modelo: {
    type: String,
    default: '',
    required: 'Please fill Bus color',
    trim: true
  },
  asientos: {
    type: String,
    default: '',
    required: 'Please fill Bus color',
    trim: true
  },
  pisos: {
    type: String,
    default: '',
    required: 'Please fill Bus color',
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

mongoose.model('Bus', BusSchema);
