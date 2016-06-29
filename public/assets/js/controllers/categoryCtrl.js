'use strict';

angular.module('categoryCtrl', ['categoryService'])
.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})
.controller('CategoryCtrl', function (CategoryFactory, $location, $scope) {

	var vm = this;

	vm.getCategories = function(){

		CategoryFactory.getAllCategories().query(function(categories){
			vm.categories = categories;
		}, function(err){
			console.error(err);
		});

	};




});