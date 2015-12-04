'use strict';

// Wishes controller
angular.module('wishes').controller('WishesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Wishes', 'TableSettings', 'WishesForm',
  function ($scope, $stateParams, $location, Authentication, Wishes, TableSettings, WishesForm) {
    $scope.authentication = Authentication;
    $scope.tableParams = TableSettings.getParams(Wishes);
    $scope.wish = {};

    $scope.setFormFields = function (disabled) {
      $scope.formFields = WishesForm.getFormFields(disabled);
    };

    // Create new Wish
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'wishForm');

        return false;
      }

      // Create new Wish object
      var wish = new Wishes({
        contains: this.contains,
        email: this.email,
        phone: this.phone
      });

      // Redirect after save
      wish.$save(function (response) {
        $location.path('wishes/' + response._id);

        // Clear form fields
        $scope.contains = '';
        $scope.email = '';
        $scope.phone = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Wish
    $scope.remove = function (wish) {
      if (wish) {
        wish.$remove();
        $scope.tableParams.reload();
      }
      else {
        $scope.wish.$remove(function () {
          $location.path('wishes');
        });
      }
    };

    // Update existing Wish
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'wishForm');

        return false;
      }

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
