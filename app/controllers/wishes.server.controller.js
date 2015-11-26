'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Wish = mongoose.model('Wish'),
	_ = require('lodash');

/**
 * Create a Wish
 */
exports.create = function(req, res) {
	var wish = new Wish(req.body);
	wish.user = req.user;

	wish.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wish);
		}
	});
};

/**
 * Show the current Wish
 */
exports.read = function(req, res) {
	res.jsonp(req.wish);
};

/**
 * Update a Wish
 */
exports.update = function(req, res) {
	var wish = req.wish ;

	wish = _.extend(wish , req.body);

	wish.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wish);
		}
	});
};

/**
 * Delete an Wish
 */
exports.delete = function(req, res) {
	var wish = req.wish ;

	wish.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wish);
		}
	});
};

/**
 * List of Wishes
 */
exports.list = function(req, res) { 
	Wish.find().sort('-created').populate('user', 'displayName').exec(function(err, wishes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wishes);
		}
	});
};

/**
 * Wish middleware
 */
exports.wishByID = function(req, res, next, id) { 
	Wish.findById(id).populate('user', 'displayName').exec(function(err, wish) {
		if (err) return next(err);
		if (! wish) return next(new Error('Failed to load Wish ' + id));
		req.wish = wish ;
		next();
	});
};

/**
 * Wish authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.wish.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
