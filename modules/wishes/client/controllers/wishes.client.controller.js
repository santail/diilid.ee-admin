'use strict';

// Wishes controller
angular.module('wishes').controller('WishesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Wishes', 'TableSettings', 'WishesForm',
  function ($scope, $stateParams, $location, Authentication, Wishes, TableSettings, WishesForm) {
    $scope.authentication = Authentication;
    $scope.tableParams = TableSettings.getParamsFactory('Wishes', Wishes);
    $scope.wish = {};

    $scope.setFormFields = function (disabled) {
      $scope.formFields = WishesForm.getFormFields(disabled);
    };

    // Create new Wish
    $scope.create = function (isValid) {
      // Create new Wish object
      var wish = new Wishes($scope.wish);

      // Redirect after save
      wish.$save(function (response) {
        $location.path('wishes/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Wish
    $scope.remove = function (wish) {
      if (wish) {
				wish = Wishes.get({
					wishId: wish._id
				}, function () {
					wish.$remove(function() {
			      $scope.tableParams.reload();
			    });
				});

			}
			else {
				$scope.wish.$remove(function () {
					$location.path('wishes');
				});
			}
    };

    // Update existing Wish
    $scope.update = function (isValid) {
      var wish = $scope.wish;

      wish.$update(function () {
        $location.path('wishes/' + wish._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.toViewWish = function () {
      $scope.wish = Wishes.get({
        wishId: $stateParams.wishId
      });
      $scope.setFormFields(true);
    };

    $scope.toEditWish = function () {
      $scope.wish = Wishes.get({
        wishId: $stateParams.wishId
      });
      $scope.setFormFields(false);
    };
  }
]);
