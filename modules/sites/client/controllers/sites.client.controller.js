'use strict';

// Sites controller
angular.module('sites').controller('SitesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sites', 'TableSettings', 'SitesForm',
	function ($scope, $stateParams, $location, Authentication, Sites, TableSettings, SitesForm) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParamsFactory('Sites', Sites);
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
					site.$remove(function () {
						$scope.tableParams.reload();
					});
				});
			}
			else {
				$scope.site.$remove(function () {
					$location.path('sites');
				});
			}
		};

		$scope.update = function (isValid) {
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

		$scope.checkboxes = { 'checked': false, items: {} };

	    // watch for check all checkbox
	    $scope.$watch('checkboxes.checked', function(value) {
	        angular.forEach($scope.tableParams.data, function(item) {
	            if (angular.isDefined(item._id)) {
	                $scope.checkboxes.items[item._id] = value;
	            }
	        });
	    });

        // watch for data checkboxes
	    $scope.$watch('checkboxes.items', function(values) {
	        if (!$scope.tableParams) {
	            return;
	        }
	        var checked = 0, unchecked = 0,
	            total = $scope.tableParams.data.length;

	        angular.forEach($scope.tableParams.data, function(item) {
	            checked   +=  ($scope.checkboxes.items[item._id]) || 0;
	            unchecked += (!$scope.checkboxes.items[item._id]) || 0;
	        });

	        if ((unchecked === 0) || (checked === 0)) {
	            $scope.checkboxes.checked = (checked === total);
	        }
	        // grayed checkbox
	        angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
	    }, true);
	}

]);
