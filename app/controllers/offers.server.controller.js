'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Offer = mongoose.model('Offer'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Offer', 'title');

module.exports = crud;