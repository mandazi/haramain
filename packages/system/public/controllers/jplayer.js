'use strict';

angular.module('mean.system').controller('JPlayerController', ['$scope', 'Global', '$rootScope',
  function($scope, Global, $rootScope) {
  	$scope.global = Global;

	$rootScope.streamAudio = 'https://archive.org/download/November262014MadeenahIsha/SheikhAleSheikh_Isha_11-26-14_32kbps.mp3';

//	$scope.surah = 'I am an artist';
//	$scope.sheikh = 'This is the title';




  }
]);
