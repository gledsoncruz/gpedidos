'use strict';

angular.module('productService', [])

.factory('ProductFactory', function($http, $q){
	var productFactory = {};
	var deferred = $q.defer();

	productFactory.getAllProducts = function(){
		return $http.get('/api/products')
		.then(function(response){
			deferred.resolve(response.data);
			return deferred.promise;
		},function(response){
			deferred.reject(response);
			//console.log(deferred.promise);
			return deferred.promise;
		});

	};

	return productFactory;
})