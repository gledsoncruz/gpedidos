'use strict';

angular.module('authCtrl', [])

.controller('AuthCtrl', function($window, $scope, $rootScope, $location, Auth){

    var vm = this;


    $rootScope.$on('$routeChangeStart', function(event, current){
        vm.loggedIn = Auth.isLoggedIn();
        //console.error('PAGINA PROTEGIDA ----> ' +current.$$route.isLogged);
        //console.error('USUARIO LOGADO ----> ' +vm.loggedIn);

        //$templateCache.removeAll();

        if (current.$$route.isLogged) {
            if (vm.loggedIn){
                Auth.getUser()
                    .then(function(data){
                    vm.user = data.data;
                },
                function(error){
                    Auth.logout();
                    vm.user = '';
                    event.preventDefault();
                    $location.path('/login');
                });
            } else {
                event.preventDefault();
                $location.path('/login');
            }
        }


    });

    vm.doLogin = function(){
        vm.processing = true;

        if ($scope.loginForm.$valid){
            vm.error = '';
        Auth.login(vm.loginData.email, vm.loginData.password)
            .success(function(data){
                vm.processing = false;

                Auth.getUser()
                    .then(function(data){
                        vm.user = data.data;
                        //console.log(vm.user.role);
                    });
                if (data.success){
                    $location.path('/me');
                } else {
                    vm.error = data.message;
                    console.log(vm.error);
                    $scope.loginForm.alerts = [{msg: vm.error}];
                    $scope.loginForm.closeAlert = function(index) {
                        $scope.loginForm.alerts.splice(index, 1);
                    };
                }
            });

        } else {
            $scope.loginForm.submitted = true;
        }

    }

    vm.doLogout = function(){
        Auth.logout();
        $window.location.reload();
    }

});