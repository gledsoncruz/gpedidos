'use strict';
var app = angular.module('gpedidos', [
	'angular.filter',
	'ngResource',
	'appRoutes',
	'ui.bootstrap',
	'angular-loading-bar',
	'productService',
	'productCtrl',
	'offerService',
	'offerCtrl',
	'categoryService',
	'categoryCtrl',
	'indexService',
	'indexCtrl',
	'authService',
	'authCtrl'
	]
);

app.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');

})