'use strict';

// Configuring the Articles module
angular.module('wishes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Wishes', 'wishes', 'dropdown', '/wishes(/create)?');
		Menus.addSubMenuItem('topbar', 'wishes', 'List Wishes', 'wishes');
		Menus.addSubMenuItem('topbar', 'wishes', 'New Wish', 'wishes/create');
	}
]);