'use strict';

var mean = require('meanio');

module.exports = function(System, app, auth, database) {

  // Home route
  var index = require('../controllers/index');
  var track = require('../controllers/track');
  app.route('/')
    .get(index.render);


  app.route('/audio')
	.get(index.audio);

  app.route('/audiobeta')
     .get(track.all);

  app.route('/track/:trackId')
    .get(track.track);

	app.get('/*',function(req,res,next){
		res.header('workerID' , JSON.stringify(mean.options.workerid) );
		next(); // http://expressjs.com/guide.html#passing-route control
	});

	// Finish with setting up the trackId param
	app.param('trackId', track.track);
};
