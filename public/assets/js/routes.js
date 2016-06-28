'use strict';

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/offersPerProduct/:id', {
      templateUrl: 'partials/offers_per_product.html'
    })
    .when('/offersPerStore/:id', {
      templateUrl: 'partials/offers_per_store.html'
    });

    //$locationProvider.html5Mode(false);


})