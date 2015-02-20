'use strict';

angular.module('mean.system').factory('GetHaramainAudioData', ['$http',
	function($http) {
		//return $http.get('audio').then(function(response) {
		return $http.get('audiobeta').then(function(response) {
			return response;
		});
	}
]);