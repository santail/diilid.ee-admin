'use strict';

// Offers controller
angular.module('offers').controller('OffersController', ['$scope', '$stateParams', '$location', '$q', 'Authentication', 'Offers', 'TableSettings', 'OffersForm', 'Sites',
	function ($scope, $stateParams, $location, $q, Authentication, Offers, TableSettings, OffersForm, Sites) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Offers);
		$scope.offer = {};

		$scope.setFormFields = function (disabled) {
			$scope.formFields = OffersForm.getFormFields(disabled);
		};

		// Create new Offer
		$scope.create = function () {
			var offer = new Offers($scope.offer);

			// Redirect after save
			offer.$save(function (response) {
				$location.path('offers/' + response._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Offer
		$scope.remove = function (offer) {

			if (offer) {
				offer = Offers.get({
					offerId: offer._id
				}, function () {
					offer.$remove(function() {
				      $scope.tableParams.reload();
				    });
				});

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


		$scope.toViewOffer = function () {
			$scope.offer = Offers.get({
				offerId: $stateParams.offerId
			});
			$scope.setFormFields(true);
		};

		$scope.toEditOffer = function () {
			$scope.offer = Offers.get({
				offerId: $stateParams.offerId
			});
			$scope.setFormFields(false);
		};

		$scope.sites = function () {
            var def = $q.defer(),
                sites = [];

            Sites.all(function (res) {
				res.$promise.then(function (result) {
				    angular.forEach(result, function (item) {
                        sites.push({
                            'id': item.url,
                            'title': item.name
                        });
	                });

		            def.resolve(sites);
				});
            });

            return def;
        };

	}

]);
