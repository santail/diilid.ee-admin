'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var wishes = require('../../app/controllers/wishes.server.controller');

	// Wishes Routes
	app.route('/wishes')
		.get(wishes.list)
		.post(users.requiresLogin, wishes.create);

	app.route('/wishes/:wishId')
		.get(wishes.read)
		.put(users.requiresLogin, wishes.hasAuthorization, wishes.update)
		.delete(users.requiresLogin, wishes.hasAuthorization, wishes.delete);

	// Finish by binding the Wish middleware
	app.param('wishId', wishes.wishByID);
};
