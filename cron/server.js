var schedule = require('node-schedule');
var feed = require("feed-read");
var mongo = require('mongodb');
var cheerio = require('cheerio');
var db = new mongo.Db('haramain', new mongo.Server('localhost',27017, {safe:false}), {});


var rule = new schedule.RecurrenceRule();
rule.minute = 30;

var j = schedule.scheduleJob(rule, function(){
	//pollData();
	pollDataTwo();
});

function pollData() {

	feed('http://www.haramain.info/feeds/posts/default', function(err, entry) {
		if (err) throw err;
		// Each article has the following properties:
		//
		//   * "title"     - The article title (String).
		//   * "author"    - The author's name (String).
		//   * "link"      - The original article link (String).
		//   * "content"   - The HTML content of the article (String).
		//   * "published" - The date that the article was published (Date).
		//   * "feed"      - {name, source, link}
		//

		db.open(function(err, client){
			client.createCollection('track', function(err, col) {
				client.collection('track', function(err, col) {
/*
					for (var i = 0; i < entry.length; i++) {


						// Get Surah
						var surah = getSurah(entry[i], i);

						// Get file path
						var filePath = getFilePath(entry[i], i);

						// Get Sheikh Name
						var sheikhName = getSheikhName(entry[i], i);

						// Get Prayer Location
						var prayerLocation = getPrayerLocation(entry[i], i);

//						console.log(sheikhName + '  ' + filePath);


						col.insert({
							sheikh: sheikhName,
							surah: surah,
							prayerLocation: prayerLocation,
							filePath: filePath
						}, function () {
						});




					}
*/
					// Get Surah
					var surahs = [];


					entry.forEach(function (entry, i) { // here forEach starts


						var surah = getSurahs(entry);


						// Get Surah
						//var surah = getSurah(entry, i);

						// Get file path
						var filePath = getFilePath(entry, i);

						// Get Sheikh Name
						var sheikhName = getSheikhName(entry, i);

						// Get Prayer Location
						var prayerLocation = getPrayerLocation(entry, i);

						console.log(sheikhName + ' ' +  surah + '  ' + prayerLocation);

/*
						col.findOne({
							filePath: filePath
						}, function (err, obj) {
							if (obj === null) {
								col.insert({
									sheikh: sheikhName,
									surah: surah,
									prayerLocation: prayerLocation,
									filePath: filePath,
									date: new Date()
								}, function () {
								});
							}

						});
						*/
					});
				});
			});
		});

	//	console.log('Total entries: ' + entry.length);
	});



}


function getSurah(obj, i) {
	var surah = '';

	if (i % 2 === 0) {
		surah = obj.content.substring(obj.content.indexOf('#ccff44;') + 10, obj.content.indexOf('#ccff44;') + 100);
		surah = surah.substring(0, surah.indexOf('span>') - 2);
		return surah;

	} else {
		surah = obj.content.substring(obj.content.indexOf('#99ffaa;') + 10, obj.content.indexOf('#99ffaa;') + 100);
		surah = surah.substring(0, surah.indexOf('span>') - 2);
		return surah;
	}


}

function getSurahs(obj) {
//	var surahs = [];
	var surah = '';
	//console.log(obj.content);
	surah = obj.content.substring(obj.content.indexOf('Surah'), obj.content.length);
	surah = surah.substring(0, surah.indexOf('span')-2);

	if (surah.indexOf(')') > -1) {
		surah = surah.replace(')', '');
	}
//	console.log(surah);
	//surahs.push(surah);


	return surah;

}

function getFilePath(obj, i) {
	var partialString = obj.content.substring(obj.content.indexOf('Download 32kbps Audio') - 150, obj.content.indexOf('Download 32kbps Audio') + 100);
	var fileName = partialString.substring(partialString.indexOf('a href=') + 8, partialString.indexOf('.mp3') + 4);
	return fileName;
}

function getSheikhName(obj, i) {
	var sheikh = '';
	if (i % 2 === 0) {
		sheikh = obj.content.substring(obj.content.indexOf('#00eeaa;') - 20, obj.content.indexOf('<embed '));
	} else {
		sheikh = obj.content.substring(obj.content.indexOf('#cc9933;') - 20, obj.content.indexOf('<embed '));

	}

	//console.log(i + '   ' + sheikh);

	// strip out HTML tags
	var regex = /(<([^>]+)>)/ig,
	body = sheikh,
	result = body.replace(regex, '');

	return result.substring(result.indexOf('Sheikh'), result.length);



}

function getPrayerLocation(obj, i) {
	var prayerLocation = '';
	var temp = '';
	if (i % 2 === 0) {
		temp = obj.content.substring(obj.content.indexOf('#cc9966;') - 20, obj.content.indexOf('#cc9966;') + 80);
		prayerLocation = temp.substring(0, temp.indexOf('<br />'));
	} else {
		temp = obj.content.substring(obj.content.indexOf('#00ffaa;') - 20, obj.content.indexOf('#00ffaa;') + 80);
		prayerLocation = temp.substring(0, temp.indexOf('<br />'));
	}

//	console.log(prayerLocation);

	// strip out HTML tags
	var regex = /(<([^>]+)>)/ig,
		body = prayerLocation,
		result = body.replace(regex, '');

	return result;



}





function pollDataTwo() {

	feed('http://www.haramain.info/feeds/posts/default', function(err, entry) {
		if (err) throw err;
		// Each article has the following properties:
		//
		//   * "title"     - The article title (String).
		//   * "author"    - The author's name (String).
		//   * "link"      - The original article link (String).
		//   * "content"   - The HTML content of the article (String).
		//   * "published" - The date that the article was published (Date).
		//   * "feed"      - {name, source, link}
		//

		db.open(function(err, client){
			client.createCollection('track', function(err, col) {
				client.collection('track', function(err, col) {

					entry.forEach(function (entry, i) { // here forEach starts
						var html = entry.content;
						$ = cheerio.load(html);


						// Get file path
					//	var filePath = getFilePath(entry[i], i);

						var metaData = [];
						$('span').each(function(i, elem) {
							var text = ($(this).text());
							if (text.indexOf('Download') > -1) {

							} else {
								if (text.indexOf(')') > -1) {
									text = text.replace('(', '').replace(')', '');
								}
								metaData.push(text);

							}

						});

						var filePath = $('a')[0].attribs.href;

						var prayerLocation = metaData[0];
						var surah = metaData[1];
						var sheikh = metaData[2];

						col.findOne({
							filePath: filePath
						}, function (err, obj) {
							if (obj === null) {
								col.insert({
									sheikh: sheikh,
									surah: surah,
									prayerLocation: prayerLocation,
									filePath: filePath,
									date: new Date()
								}, function () {
								});
							}

						});


					});
				});
			});
		});
	});



}