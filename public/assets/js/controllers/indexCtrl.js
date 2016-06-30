'use strict';

angular.module('indexCtrl', ['indexService'])

.controller('IndexCtrl', function (IndexFactory, $location, $scope) {

	var vm = this;
	$scope.date = new Date();

	vm.getAppInfo = function(){

		IndexFactory.getAppInfo().get(function(appInfo){
			vm.appInfo = appInfo;
		}, function(err){
			console.error(err);
		});

	};

});