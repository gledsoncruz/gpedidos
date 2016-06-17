'use strict';

angular.module('productCtrl', ['productService'])
.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})
.controller('ProductCtrl', function (ProductFactory, $location, $scope) {

	var vm = this;

	vm.getProducts = function(){
		ProductFactory.getAllProducts()
			.then(function(data){
				vm.products = data;
				$scope.currentPage = 1;
			    $scope.itemsPerPage = 24;
			    $scope.maxSize = 10;
			    $scope.totalItems = vm.products.length;
			    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

			}, function(error){

				console.log('ERROR');

			});
	};




});