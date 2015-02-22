'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'GetHaramainAudioData', '$rootScope',
	'$stateParams', '$filter',
  function($scope, Global, GetHaramainAudioData, $rootScope, $stateParams, $filter) {
    $scope.global = Global;
/*
    $scope.sites = {
      'makeapoint':{
        'name':'makeapoint',
        'text':'Makeapoint is a platform to craft and fine-tune ideas and messages providing a graphical experience which brough an offline methodlogy online',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'/theme/assets/img/makeapoint.png'
      },
      'cactus':{
        'name':'Cactus Intranet',
        'text':'Cactus Intranet is an enterprise social network with features like real-time newsfeed, notifications, groups, events, polls, referral system etc. The system has role based permission system, allowing different stakeholders access and controls relevant to them.',
        'author':'QED42',
        'link':'http://www.qed42.com',
        'image':'/theme/assets/img/cactus.png'
      }
    };
    $scope.packages = {
      'gmap':{
        'name':'gmap',
        'text':'gmap lets you add geographical information to your applications objects',
        'author':'linnovate',
        'link':'http://www.qed42.com',
        'image':'/theme/assets/img/gmap.png'
      },
      'upload':{
        'name':'Upload',
        'text':'hello text',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      },
      'socket':{
        'name':'Socket',
        'text':'Socket.io support',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      }
    };

    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i+=1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });
*/

	  $scope.friends = [
		  { name: "Peter",   age: 20 },
		  { name: "Pablo",   age: 55 },
		  { name: "Linda",   age: 20 },
		  { name: "Marta",   age: 37 },
		  { name: "Othello", age: 20 },
		  { name: "Markus",  age: 32 }
	  ];

	  $scope.filterFunction = function(element) {
		  return element.name.match(/^Ma/) ? true : false;
	  };
	$scope.loadAll = function () {
		GetHaramainAudioData.then(function (response) {
			$rootScope.audioTracks = response.data;
			for (var i = 0; i < $rootScope.audioTracks.length; i += 1) {
				if ($rootScope.audioTracks[i].sheikh === undefined) {
					$rootScope.audioTracks[i].sheikh = $filter('getSheikhName')($rootScope.audioTracks[i].url);
				}
			}
		});
	};

  }
]);
