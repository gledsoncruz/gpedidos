'use strict';

angular.module('userCtrl', ['userService', 'authService'])
.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})

.controller('UserCtrl', function (UserFactory, Auth, $location, $scope) {

	var vm = this;

	vm.create = function(){

		if ($scope.formSignup.$valid){

			UserFactory.createUser(vm.userData)
				.success(function(data){
					if (data.success){
						$location.path('/me');
					} else {
						vm.error = data.message;
	                    $scope.formSignup.alerts = [{msg: vm.error}];
	                    $scope.formSignup.closeAlert = function(index) {
	                        $scope.formSignup.alerts.splice(index, 1);
	                    };
					}
				});
		} else {
			$scope.formSignup.submitted = true;
			console.log('form invalid');
		}

	};

	vm.getUser = function(){
		UserFactory.getUser()
			.then(function(data){
				vm.user = data.data;
				console.error(vm.user.id);
			}, function(error){
				console.log('Erro ao recuperar usuario');
			})
	};

	// vm.getUsers = function(){
	// 	UserFactory.getAllUsers()
	// 		.then(function(data){
	// 			vm.users = data;
	// 			$scope.currentPage = 1;
	// 		    $scope.itemsPerPage = 10;
	// 		    $scope.maxSize = 10;
	// 		    $scope.totalItems = vm.users.length;
	// 		    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

	// 		}, function(error){

	// 			console.log('Acesso não permitido.');
	// 			$location.path('/dashboard');
	// 		});
	// }




});