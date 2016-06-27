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
		OfferFactory.getAllOffers()
			.then(function(data){
				vm.offers = data;
				$scope.currentPage = 1;
			    $scope.itemsPerPage = 24;
			    $scope.maxSize = 10;
			    $scope.totalItems = vm.offers.length;
			    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

			}, function(error){

				console.log('ERROR');

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
			$scope.offerMinValue = minValue;
			$scope.offerMaxValue = maxValue;
			$scope.offerDiff = maxValue - minValue;
			$scope.offerAverage = (maxValue + minValue)/2;
		}, function(err){
			console.error(err);
		})

	};

});