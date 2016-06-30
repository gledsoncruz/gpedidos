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
      templateUrl: 'partials/offers_per_store.html',
      controller: 'OfferCtrl',
      controllerAs: 'offersCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html'
    })
    .when('/me', {
      templateUrl: 'partials/me.html'
    })
    .when('/404', {
      templateUrl: 'partials/404.html'
    })
    .otherwise({
        redirectTo: '/404'
      });;

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });


})