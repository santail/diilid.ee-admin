'use strict';

// Sites controller
angular.module('sites').controller('SitesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sites', 'TableSettings', 'SitesForm',
	function ($scope, $stateParams, $location, Authentication, Sites, TableSettings, SitesForm) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Sites);
		$scope.site = {};

		$scope.setFormFields = function (disabled) {
			$scope.formFields = SitesForm.getFormFields(disabled);
		};


		// Create new Site
		$scope.create = function () {
			var site = new Sites($scope.site);

			// Redirect after save
			site.$save(function (response) {
				$location.path('sites/' + response._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Site
		$scope.remove = function (site) {

			if (site) {
				site = Sites.get({
					siteId: site._id
				}, function () {
					site.$remove();
					$scope.tableParams.reload();
				});

			}
			else {
				$scope.site.$remove(function () {
					$location.path('sites');
				});
			}

		};

		$scope.update = function (isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'siteForm');

				return false;
			}

			var site = $scope.site;

			site.$update(function () {
				$location.path('sites/' + site._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.toViewSite = function () {
			$scope.site = Sites.get({
				siteId: $stateParams.siteId
			});
			$scope.setFormFields(true);
		};

		$scope.toEditSite = function () {
			$scope.site = Sites.get({
				siteId: $stateParams.siteId
			});
			$scope.setFormFields(false);
		};

	}

]);
