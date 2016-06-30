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

// app.config(['$routeProvider', '$httpProvider', function ($httpProvider) {

//     $provider.factory('gpedidosInterceptor', function($q, $location, $localStorage){
//     	return {
//                 'request': function (config) {
//                     config.headers = config.headers || {};
//                     if ($localStorage.token) {
//                         config.headers.Authorization = 'x-access-token ' + $localStorage.token;
//                     }
//                     return config;
//                 },
//                 'responseError': function(response) {
//                     if(response.status === 401 || response.status === 403) {
//                         $location.path('/login');
//                     }
//                     return $q.reject(response);
//                 }
//             }
//     })

//     $httpProvider.interceptors.push('gpedidosInterceptor');
// }]);