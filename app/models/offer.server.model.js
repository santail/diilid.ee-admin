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
	site: {
		'type': String,
		'default': '',
		'required': 'Please fill Offer site',
		'trim': true
	},
	'created': {
		'type': Date,
		'default': Date.now
	}
}, {
	autoIndex: process.env.NODE_ENV == 'development'
});

mongoose.model('Offer', OfferSchema);