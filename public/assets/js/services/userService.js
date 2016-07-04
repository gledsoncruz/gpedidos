'use strict';

angular.module('userService', [])

.factory('UserFactory', function($http, $q, $resource, AuthToken){
	var userFactory = {};
	var deferred = $q.defer();

	userFactory.createUser = function(userData){
		return $http.post('/api/signup', userData);
	};

	userFactory.getAllUsers = function(){
		return $resource('/api/users');
	};

	userFactory.getUser = function(){
        if (AuthToken.getToken()){
            return $http.get('/api/me');
        } else {
            return $q.reject({ message: "User has do not token" });
        }
    }


	return userFactory;

})