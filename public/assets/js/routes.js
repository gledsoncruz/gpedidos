'use strict';

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      isLogged: false
    })
    .when('/offersPerProduct/:id', {
      templateUrl: 'partials/offers_per_product.html',
      isLogged: false
    })
    .when('/offersPerStore/:id', {
      templateUrl: 'partials/offers_per_store.html',
      controller: 'OfferCtrl',
      controllerAs: 'offersCtrl',
      isLogged: false
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      isLogged: false
    })
    .when('/register', {
      templateUrl: 'partials/signup.html',
      isLogged: false
    })
    .when('/me', {
      templateUrl: 'partials/me.html',
      isLogged: true
    })
    .when('/404', {
      templateUrl: 'partials/404.html',
      isLogged: false
    })
    .otherwise({
        redirectTo: '/404',
        isLogged: false
      });;

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });


})