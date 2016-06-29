'use strict';

angular.module('offerCtrl', ['offerService'])
.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})
.controller('OfferCtrl', function (OfferFactory, $location, $scope, $routeParams) {

	var vm = this;
	//$scope.offersPerProduct = [];

	vm.getOffers = function(){

		OfferFactory.getAllOffers().query(function(offers){
			vm.offers = offers;
			$scope.currentPage = 1;
		    $scope.itemsPerPage = 24;
		    $scope.maxSize = 10;
		    $scope.totalItems = vm.offers.length;
		    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
		}, function(err){
			console.error(err);
		});
	};

	vm.getOffersPerProduct = function(){

		OfferFactory.getOffersPerProduct().get({id: $routeParams.id}, function(product){
			vm.product = product;
			var minValue = 99999;
			var maxValue = 0;
			product.offers.forEach(function(offer){
				if (offer.price < minValue){
					minValue = offer.price;
				}
				if (offer.price > maxValue){
					maxValue = offer.price;
				}
			});
			$scope.currentPage = 1;
		    $scope.itemsPerPage = 10;
		    $scope.maxSize = 10;
		    $scope.totalItems = vm.product.offers.length;
		    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

			$scope.offerMinValue = minValue;
			$scope.offerMaxValue = maxValue;
			$scope.offerDiff = maxValue - minValue;
			$scope.offerAverage = (maxValue + minValue)/2;
		}, function(err){
			console.error(err);
		})

	};

	vm.getOffersPerStore = function(){

		$scope.rate = 7;
		$scope.max = 10;
		$scope.isReadonly = true;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};

		// $scope.ratingStates = [
		//     {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
		//     {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		//     {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
		//     {stateOn: 'glyphicon-heart'},
		//     {stateOff: 'glyphicon-off'}
		//   ];

		OfferFactory.getOffersPerStore().get({id: $routeParams.id}, function(store){
			vm.store = store;
			$scope.currentPage = 1;
		    $scope.itemsPerPage = 10;
		    $scope.maxSize = 10;
		    $scope.totalItems = vm.store.offers.length;
		    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

		}, function(err){
			console.error(err);
		})

	};

});