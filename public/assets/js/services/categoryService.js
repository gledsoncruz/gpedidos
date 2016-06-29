'use strict';

angular.module('categoryService', [])

.factory('CategoryFactory', function($resource){
	var categoryFactory = {};

	categoryFactory.getAllCategories = function(){
		return $resource('/api/categoriesWithOffers');
	};

	return categoryFactory;
})