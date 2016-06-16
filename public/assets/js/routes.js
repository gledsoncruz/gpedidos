'use strict';

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    });

    //$locationProvider.html5Mode(false);


})