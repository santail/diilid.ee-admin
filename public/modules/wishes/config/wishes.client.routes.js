'use strict';

//Setting up route
angular.module('wishes').config(['$stateProvider',
	function($stateProvider) {
		// Wishes state routing
		$stateProvider.
		state('listWishes', {
			url: '/wishes',
			templateUrl: 'modules/wishes/views/list-wishes.client.view.html'
		}).
		state('createWish', {
			url: '/wishes/create',
			templateUrl: 'modules/wishes/views/create-wish.client.view.html'
		}).
		state('viewWish', {
			url: '/wishes/:wishId',
			templateUrl: 'modules/wishes/views/view-wish.client.view.html'
		}).
		state('editWish', {
			url: '/wishes/:wishId/edit',
			templateUrl: 'modules/wishes/views/edit-wish.client.view.html'
		});
	}
]);