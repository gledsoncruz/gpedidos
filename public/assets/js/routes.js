'use strict';

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/offers', {
      templateUrl: 'partials/offers.html'
    });

    //$locationProvider.html5Mode(false);


})