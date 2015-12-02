'use strict';

// Offers controller
angular.module('offers').controller('OffersController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Offers',
  function ($scope, $http, $stateParams, $location, Authentication, Offers) {
    $scope.authentication = Authentication;

		//Pagination
		$scope.currentPage = 1;
    $scope.pageSize = 50;

    // Create new Offer
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'offerForm');

        return false;
      }

      // Create new Offer object
      var offer = new Offers({
				title: this.title,
				site: this.site,
				url: this.url
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

    // Remove existing Article
    $scope.remove = function (offer) {
      if (offer) {
        offer.$remove();

        for (var i in $scope.offers) {
          if ($scope.offers[i] === offer) {
            $scope.offers.splice(i, 1);
          }
        }
      } else {
        $scope.offer.$remove(function () {
          $location.path('offers');
        });
      }
    };

	// Update existing Offers
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var offer = $scope.offer;

      offer.$update(function () {
        $location.path('offers/' + offer._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

		// Find a list of Offers
    $scope.find = function(offer) {
      var query = '/api/offers?_page=' + $scope.currentPage + '&_size=' + $scope.pageSize;

      if (offer) {
        query += '&_contains='+ offer.title;
        console.log(offer, query);
      }

        $http.get(query).success(function (response) {
        	$scope.offers = response.items;
        	$scope.total = response.total;
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

    // Find existing Category
    $scope.typeahead = function(contains) {
        return $http.get('/api/offers?_contains=' + contains)
          .then(function (response) {
          	return response.data;
          });
    };
	}
]);