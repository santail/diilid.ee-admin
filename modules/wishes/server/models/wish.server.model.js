'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Wish Schema
 */
var WishSchema = new Schema({
	contains: {
		type: String,
		default: '',
		required: 'Please fill wish body',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill email',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		trim: true
	},
	language: {
		type: String,
		default: 'rus',
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
}, {
	autoIndex: process.env.NODE_ENV === 'development'
});

mongoose.model('Wish', WishSchema);