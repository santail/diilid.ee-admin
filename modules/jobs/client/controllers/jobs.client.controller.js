'use strict';

// jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', '$q', 'Authentication', 'Jobs', 'TableSettings', 'Sites',
	function ($scope, $stateParams, $location, $q, Authentication, Jobs, TableSettings, Sites) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Jobs);
		$scope.job = {};

		// Remove existing Job
		$scope.remove = function (job) {

			if (job) {
				job = Jobs.get({
					jobId: job._id
				}, function () {
					job.$remove(function() {
				      $scope.tableParams.reload();
				    });
				});

			}
			else {
				$scope.job.$remove(function () {
					$location.path('jobs');
				});
			}

		};

		$scope.toViewJob = function () {
			$scope.job = Jobs.get({
				jobId: $stateParams.jobId
			});
		};

	}

]);
