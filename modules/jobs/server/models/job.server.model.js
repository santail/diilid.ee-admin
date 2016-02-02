'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
	"name" : String,
	"params" : Schema.Types.Mixed,
	"queue" : String,
	"attempts" : String,
	"timeout" : String,
	"delay" : String,
	"priority" : String,
	"status" : String,
	"enqueued" : String
});

mongoose.model('Job', JobSchema);