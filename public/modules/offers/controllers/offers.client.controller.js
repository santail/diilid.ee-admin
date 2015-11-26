'use strict';

// Offers controller
angular.module('offers').controller('OffersController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Offers',
	function ($scope, $stateParams, $location, $http, Authentication, Offers) {
		$scope.authentication = Authentication;

		//Pagination
		$scope.currentPage = 1;
        $scope.pageSize = 50;
        $scope.offset = 0;

		// Create new Offer
		$scope.create = function () {
			// Create new Offer object
			var offer = new Offers({
				title: this.title,
				site: this.site
			});

			// Redirect after save
			offer.$save(function (response) {
				$location.path('offers/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.site = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Offer
		$scope.remove = function (offer) {
			if (offer) {
				offer.$remove();

				for (var i in $scope.offers) {
					if ($scope.offers[i] === offer) {
						$scope.offers.splice(i, 1);
					}
				}
			}
			else {
				$scope.offer.$remove(function () {
					$location.path('offers');
				});
			}
		};

		// Update existing Offer
		$scope.update = function () {
			var offer = $scope.offer;

			offer.$update(function () {
				$location.path('offers/' + offer._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Offers
        $scope.find = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;

        	$http.get('/offers/total').success(function (response) {
                $scope.total = response.total;
            }).error(function (response) {
                $scope.error = response.message;
            });

            $http.get('/offers/' + $scope.currentPage + '/' + $scope.pageSize).success(function (response) {
            	$scope.offers = response;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };

        // Find existing Category
        $scope.findOne = function() {
            $scope.offer = Offers.get({
                offerId: $stateParams.offerId
            });
        };

        // Search for a offer
        $scope.offerSearch = function(offer) {
            $location.path('offers/' + offer._id);
        };
	}
]);