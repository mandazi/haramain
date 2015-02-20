'use strict';

// Directive for jPlayer Controls
angular.module('mean.system').directive('jplayer', function($rootScope) {
	return {
		restrict: 'EA',
		template: '<div></div>',
		link: function(scope, element, attrs) {
			var $control = element,
				$player = $control.children('div'),
				cls = 'glyphicon-pause';


			var calcTime = function (time) {
				var minutes = Math.floor(time / 60);
				var seconds = Math.floor(time - minutes * 60);

				if (seconds < 10) {
					seconds = '0' + seconds;
				}

				return minutes + ':' + seconds;
			};

			var updatePlayer = function() {
				$player.jPlayer({
					// Flash fallback for outdated browser not supporting HTML5 audio/video tags
					// http://jplayer.org/download/
					swfPath: 'js/jplayer/',
					supplied: 'mp3',
					solution: 'html, flash',
					preload: 'auto',			// use 'none' to disable preloading
					wmode: 'window',
					remainingDuration: true,
					toggleDuration: true,
					cssSelectorAncestor: '',
					cssSelector: {
						seekBar: '.seek-bar',
						playBar: '.play-bar',
						currentTime: '.time',
					},
					ready: function () {
						$player
							.jPlayer('setMedia', {mp3: scope.$eval(attrs.audio)})
							.jPlayer(attrs.autoplay === 'false' ? 'play' : 'pause');
					},
					/**
					 * Event handler for when jPlayer track is ready
					 * This function's purpose is to populate the duration for inline player
					 * @param {Object} event - jPlayer event data
					 */
					loadeddata: function(event){ // calls after setting the song duration


							var songDuration = event.jPlayer.status.duration;

						//	var div = $control[0].id;
						//	var id = div.split('-')[2];


							var time = calcTime(songDuration);


							// Set it in the HTML
							document.getElementById('duration').innerHTML = time;




					},
					play: function() {
						$control.addClass(cls);

						// Set the current player in the rootScope so it can be accessed by controllers
						$rootScope.currentPlayer = $control[0].id;
						$rootScope.currentPlayerPos = $control[0].offsetTop;


						if (attrs.pauseothers === 'true') {
							$player.jPlayer('pauseOthers');
						}
					},
					pause: function() {
						$control.removeClass(cls);
						$rootScope.isPlaying = false;

					},
					/*
					 stop: function() {
					 $control.removeClass(cls);
					 },
					 */
					ended: function() {
						$control.removeClass(cls);
					},

					/**
					 * Error handler for jPlayer
					 * This functions purpose is to update the main live stream
					 * when it gets paused. It will set the stream again and
					 * begin the buffer to allow the user to be live.
					 * @param {Object} event - jPlayer event data
					 */
					error: function(event) {
						if(event.jPlayer.error.type === 'e_url_not_set') {
							// Setup the media stream again and play it.
							$player
								.jPlayer('setMedia', {mp3: scope.$eval(attrs.audio)})
								.jPlayer('play');
						}
					}
				})
					.end()
					.unbind('click').click(function(e) {
						$player.jPlayer($control.hasClass(cls) ? 'pause' : 'play');
					});
			};

			scope.$watch(attrs.audio, updatePlayer);
			$rootScope.$watch('streamAudio', function() {
				$player
					.jPlayer('setMedia', {mp3: $rootScope.streamAudio})
					.jPlayer('play');
			});
			updatePlayer();

		}
	};
});

// Directive for handling titles (whether it scrolls or static text)
angular.module('mean.system').directive('scrollText', function ($compile) {

	var getTemplate = function(contentType) {
		var template = '';
		var browserWidth = document.body.offsetWidth;

		var scrollText = '<marquee style="width: 120px" scrollamount="2" behavior="scroll" direction="left" id="scroll-title">' + contentType + '</marquee>';
		var staticText = '<span>' + contentType + '</span>';

		if(contentType.length > 25 && browserWidth < 480) {
			template = scrollText;
		} else {
			template = staticText;
		}
		return template;
	};
	var linker = function(scope, element, attrs) {
		attrs.$observe('value', function (newValue) {
			element.html(getTemplate(newValue)).show();
			$compile(element.contents())(scope);
		});

	};
	return {
		restrict: 'E',
		replace: true,
		link: linker,
		scope: {
			content:'='
		}
	};
});


// Directive for back button
angular.module('mean.system').directive('backButton', function(){
	return {
		restrict: 'A',

		link: function(scope, element, attrs) {
			function goBack() {
				history.back();
				scope.$apply();
			}

			element.bind('click', goBack);
		}
	};
});

// Directive for back button
angular.module('mean.system').directive('forwardButton', function(){
	return {
		restrict: 'A',

		link: function(scope, element, attrs) {
			function goForward() {
				history.forward();
				scope.$apply();
			}

			element.bind('click', goForward);
		}
	};
});

