'use strict';

angular.module('offerService', [])

.factory('OfferFactory', function($http, $q, $resource){
	var offerFactory = {};
	var deferred = $q.defer();

	offerFactory.getAllOffers = function(){
		return $resource('/api/productsInOffers');
	};

	offerFactory.getOffersPerProduct = function(){
		return $resource('/api/offersPerProduct/:id');
	};

	offerFactory.getOffersPerStore = function(){
		return $resource('/api/offersPerStore/:id');
	};

	return offerFactory;
})