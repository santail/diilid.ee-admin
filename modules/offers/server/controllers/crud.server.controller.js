'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

module.exports = function(modelName, sortBy) {

	var Model = mongoose.model(modelName);
	var page = 1;
	var pageSize = 5;

	return {
		create: function(req, res) {
			var model = new Model(req.body);

			model.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.status(201).json(model);
				}
			});
		},

		read: function (req, res) {
		  res.json(req.model);
		},

		update: function(req, res) {
			var model = req.modelName;

			model = _.extend(model, req.body);

			model.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(model);
				}
			});
		},
		'delete': function(req, res) {
			var model = req.modelName;

			model.remove(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(model);
				}
			});
		},
		list: function(req, res) {
			var query = {};
			var paging = false;

			if (req.query.filter) {
				// TODO: extend this to handle multiple filters
				query = JSON.parse(req.query.filter);
			}

			if(req.query._contains) {
		      query = {
			    $text: {
			      $search: req.query._contains,
			      $language: req.query._lan || 'ru'
			    }
			  };
		    }

			if(req.query._page) {
		      page = req.query._page;
		      paging = true;
		    }

    		if(req.query._size) {
		      pageSize = req.query._size;
		      paging = true;
		    }

			var offset = (page - 1) * pageSize;

			if (paging) {
				Model.count({}, function( err, count){
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						Model.find(query).sort(sortBy).skip(offset).limit(pageSize).exec(function(err, models) {
							if (err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								res.json({
									total: count,
									items: models
								});
							}
						});
					}
				});


			}
			else {
				Model.find(query).sort(sortBy).exec(function(err, models) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.json(models);
					}
				});
			}
		},

		getByID: function(req, res, next, id) {
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).send({
					message: modelName + ' is invalid'
				});
			}

			Model.findById(id).exec(function(err, model) {
				if (err) {
			      return next(err);
			    } else if (!model) {
					return res.status(404).send({
		  				message: modelName + ' not found'
		  			});
				}
				req.model = model;
				next();
			});
		}
	};
};