'use strict';

// Wishes controller
angular.module('wishes').controller('WishesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Wishes',
	function($scope, $stateParams, $location, Authentication, Wishes) {
		$scope.authentication = Authentication;

		// Create new Wish
		$scope.create = function() {
			// Create new Wish object
			var wish = new Wishes ({
				contains: this.contains,
				email: this.email
			});

			// Redirect after save
			wish.$save(function(response) {
				$location.path('wishes/' + response._id);

				// Clear form fields
				$scope.contains = '';
				$scope.email = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Wish
		$scope.remove = function(wish) {
			if ( wish ) {
				wish.$remove();

				for (var i in $scope.wishes) {
					if ($scope.wishes [i] === wish) {
						$scope.wishes.splice(i, 1);
					}
				}
			} else {
				$scope.wish.$remove(function() {
					$location.path('wishes');
				});
			}
		};

		// Update existing Wish
		$scope.update = function() {
			var wish = $scope.wish;

			wish.$update(function() {
				$location.path('wishes/' + wish._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Wishes
		$scope.find = function() {
			$scope.wishes = Wishes.query();
		};

		// Find existing Wish
		$scope.findOne = function() {
			$scope.wish = Wishes.get({
				wishId: $stateParams.wishId
			});
		};
	}
]);