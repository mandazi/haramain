'use strict';

angular.module('mean.system').controller('TrackController', ['$scope', 'Global', 'FindTrack', '$rootScope',
	'$stateParams',
  function($scope, Global, FindTrack, $rootScope, $stateParams) {
    $scope.global = Global;



	  $scope.play = function () {

		  FindTrack($stateParams.trackId).then(function (response) {
			  $scope.track = response.data;

			  $rootScope.streamAudio = $scope.track.filePath;

			  $rootScope.sheikh = $scope.track.sheikh;
			  $rootScope.surah = $scope.track.surah;


			  $rootScope.resultLoaded = true;
			  $rootScope.isPlaying = true;

		  });

	  };


  }
]);
