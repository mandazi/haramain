'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Track Schema
 */
var TrackSchema = new Schema({
  date: {
    type: Date
  },
  sheikh: {
    type: String,
    trim: true
  },
  surah: {
    type: String,
    trim: true
  },
  prayerLocation: {
	  type: String,
	  trim: true
  },
  filePath: {
    type: String,
	trim: true
  }
}, { collection: 'track' });


/**
 * Statics
 */
TrackSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate().exec(cb);
};

mongoose.model('Track', TrackSchema);
