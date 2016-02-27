'use strict';

// Offers controller
angular.module('offers').controller('OffersController', ['$scope', '$stateParams', '$location', '$q', 'Authentication', 'Offers', 'TableSettings', 'OffersForm', 'Jobs', 'Sites',
	function ($scope, $stateParams, $location, $q, Authentication, Offers, TableSettings, OffersForm, Jobs, Sites) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParamsFactory('Offers', Offers);
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
					offer.$remove(function () {
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

		$scope.languages = function () {
			return [{
					'id': '',
					'title': ''
	            },
				{
					'id': 'ru',
					'title': 'Russian'
	            },
				{
					'id': 'et',
					'title': 'Estonian'
                },
				{
					'id': 'en',
					'title': 'English'
                },
				{
					'id': 'fi',
					'title': 'Finnish'
                }];
		};

		$scope.trueFalse = function () {
			return [{
					'id': '',
					'title': ''
	            },
				{
					'id': 'true',
					'title': 'Active'
	            },
				{
					'id': 'false',
					'title': 'Not active'
                }];
		};

		$scope.callReprocessing = function (offer) {
			offer = Offers.get({
				offerId: offer._id
			}, function () {
				var job = new Jobs({
					"name": "offer_fetch_event",
					"params": {
						"id": offer.id,
						"site": offer.site,
						"language": offer.language,
						"url": offer.url,
						"refresh": true
					},
					"queue": "offers_queue",
					"attempts": null,
					"timeout": null,
					"delay": new Date().toISOString(),
					"priority": 0,
					"status": "queued",
					"enqueued": new Date().toISOString()
				});

				// Redirect after save
				job.$save(function (response) {
					offer.$remove(function () {
						$scope.tableParams.reload();
					});
				}, function (errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});
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
