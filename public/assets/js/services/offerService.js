'use strict';

angular.module('offerService', [])

.factory('OfferFactory', function($http, $q, $resource){
	var offerFactory = {};
	var deferred = $q.defer();

	offerFactory.getAllOffers = function(){
		return $http.get('/api/productsInOffers')
		.then(function(response){
			deferred.resolve(response.data);
			return deferred.promise;
		},function(response){
			deferred.reject(response);
			//console.log(deferred.promise);
			return deferred.promise;
		});

	};

	offerFactory.getOffersPerProduct = function(){
		return $resource('/api/offersPerProduct/:id');
	};

	return offerFactory;
})