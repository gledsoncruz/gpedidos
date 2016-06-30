'use strict';

angular.module('indexService', [])

.factory('IndexFactory', function($resource){
	var indexFactory = {};

	indexFactory.getAppInfo = function(){
		return $resource('/api/app-info');
	};

	return indexFactory;
})