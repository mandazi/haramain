'use strict';


var mean = require('meanio');
var request = require('request');
var unescape = require('unescape');


exports.render = function(req, res) {

  var modules = [];
  // Preparing angular modules list with dependencies
  for (var name in mean.modules) {
    modules.push({
      name: name,
      module: 'mean.' + name,
      angularDependencies: mean.modules[name].angularDependencies
    });
  }

  function isAdmin() {
    return req.user && req.user.roles.indexOf('admin') !== -1;
  }

  // Send some basic starting info to the view
  res.render('index', {
    user: req.user ? {
      name: req.user.name,
      _id: req.user._id,
      username: req.user.username,
      roles: req.user.roles
    } : {},
    modules: modules,
    isAdmin: isAdmin,
    adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
  });
};

exports.audio = function(req, res) {
	request('http://www.haramain.info/feeds/posts/default', function (error, response, html) {
		if (!error && response.statusCode === 200) {
			var soundFiles = html.split('soundFile=');

			var newHTML = unescape(html);


			var titleNames = newHTML.split('<span style="color:');



			var json = '[';

			// Start at 1 because first element is some weird XML thing
			for (var i = 1; i < soundFiles.length; i+=1) {
				var fileEnding = soundFiles[i].indexOf('.mp3');
				var fileName = soundFiles[i].substring(0, fileEnding) + '.mp3';
					if (fileName.indexOf('Sheikh') > -1 && fileName.indexOf('Khutbah') < 1) {
						json += '{"url": "' + fileName + '" },';
					}

//
			}
			json = json.substring(0, json.length - 1) + ']';

			var prayerLocationAndTime = [];
			var surah = [];
			var sheikh = [];

			var beginning = '';

			// Organize all the HTML into individual arrays
			for (var j = 1; j < titleNames.length; j+=1) {

				if (j % 3 === 1) {
					beginning = titleNames[j].substring(titleNames[j].indexOf('>') + 1,50);
					var prayerLocationAndTimeName = beginning.substring(0, beginning.indexOf('</span>'));
					prayerLocationAndTimeName = prayerLocationAndTimeName.replace('\\', '');
					prayerLocationAndTime.push(prayerLocationAndTimeName);
				} else if (j % 3 === 2) {
					beginning = titleNames[j].substring(titleNames[j].indexOf('>') + 1,50);
					var surahName = beginning.substring(0, beginning.indexOf('</span>'));
					surahName = surahName.replace('\\', '');
					surah.push(surahName);
				} else {
					beginning = titleNames[j].substring(titleNames[j].indexOf('>') + 1,50);
					var imamName = beginning.substring(0, beginning.indexOf('</span>'));
					imamName = imamName.replace('\\', '');
					sheikh.push(imamName);
				}

			}




			var jsonArray = JSON.parse(json);

			// Append Surah Name, Sheikh Name, and Prayer Location
			for (var k = 0; k < jsonArray.length; k+=1) {

				jsonArray[k].surah = surah[k];
				jsonArray[k].sheikh = sheikh[k];
				jsonArray[k].prayerlocation = prayerLocationAndTime[k];


			}

			res.json(jsonArray);
		}
	});

};

exports.audioNew = function(req, res) {
	request('http://www.haramain.info/feeds/posts/default', function (error, response, html) {
		if (!error && response.statusCode === 200) {


			res.send(response);
		}
	});

};



