'use strict';

angular.module('offerCtrl', ['offerService'])
.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})
.controller('OfferCtrl', function (OfferFactory, $location, $scope) {

	var vm = this;

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




});