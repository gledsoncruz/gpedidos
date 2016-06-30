'use strict';

angular.module('userService', [])

.factory('UserFactory', function($http, $q, $resource){
	var userFactory = {};
	var deferred = $q.defer();

	userFactory.createUser = function(userData){
		return $http.post('/api/signup', userData);
	};

	userFactory.getAllUsers = function(){
		return $resource('/api/users');
	};

	userFactory.login = function(email, password){
		return $resource('/efood/api/login', {
			email: email,
			password: password
		});


	}


	return userFactory;

})