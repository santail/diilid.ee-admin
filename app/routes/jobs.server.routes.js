'use strict';

var config = require('../../config/config');

var Agenda = require('agenda');
var agendaUI = require('agenda-ui');

module.exports = function(app) {
    var agenda = new Agenda({db: { address: config.db}});

	app.use('/jobs', agendaUI(agenda, {poll: 1000}));
};
