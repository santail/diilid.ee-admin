'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Offer Schema
 */
var OfferSchema = new Schema({
	title: {
		'type': String,
		'default': '',
		'required': 'Please fill Offer title',
		'trim': true
	},
	'created': {
		'type': Date,
		'default': Date.now
	}
});

mongoose.model('Offer', OfferSchema);