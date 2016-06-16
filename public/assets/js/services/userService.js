'use strict';

angular.module('userService', [])

.factory('UserFactory', function($http, $q){
	var userFactory = {};
	var deferred = $q.defer();

	userFactory.createUser = function(userData){
		return $http.post('/api/signup', userData);
	};

	userFactory.getAllUsers = function(){
		return $http.get('/api/users')
		.then(function(response){
			deferred.resolve(response.data);
			return deferred.promise;
		},function(response){
			deferred.reject(response);
			//console.log(deferred.promise);
			return deferred.promise;
		});

	};

	return userFactory;
})