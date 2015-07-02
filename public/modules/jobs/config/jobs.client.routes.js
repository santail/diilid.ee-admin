'use strict';

// Setting up route
angular.module('jobs').config(['$stateProvider',
	function($stateProvider) {
		// Jobs state routing
		$stateProvider.
		state('listJobs', {
			url: '/jobs',
			controller: function ($scope, $window) {
		      $window.location.href = '/jobs';
		    }
		});
	}
]);