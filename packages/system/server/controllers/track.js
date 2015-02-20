'use strict';

//var mongo = require('mongodb');
var mongoose = require('mongoose'),
Track = mongoose.model('Track');
/*
var db = new mongo.Db('haramain', new mongo.Server('localhost',27017, {safe:false}), {});

exports.all = function(req, res) {
	db.open(function (err, client) {
		client.createCollection('track', function (err, col) {
			client.collection('track', function (err, col) {

				col.find().toArray(function (err, items) {
					res.json(items);
				});
			});
		});
	});
};
*/
/**
 * List of Audio Tracks
 */
exports.all = function(req, res) {
	Track.find().sort('-date').exec(function(err, tracks) {
		if (err) {
			console.log(err);
			return res.json(500, {
				error: 'Cannot list the tracks'
			});
		}
		res.json(tracks);

	});
};


/**
 * Find track by id
 */
exports.track = function(req, res, next, id) {
	Track.findOne({ _id: id }).sort('-date').exec(function(err, track) {
		if (err) {
			console.log(err);
			return res.json(500, {
				error: 'Cannot find the track'
			});
		}
		res.json(track);

	});
};





