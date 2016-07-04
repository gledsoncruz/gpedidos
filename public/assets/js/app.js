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
	'authCtrl',
	'userService',
	'userCtrl',
	'ngMessages',
	'ui.utils.masks',
	'ngPassword'
	]
);

app.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');

});