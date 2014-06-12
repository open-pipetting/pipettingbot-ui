'use strict';

var gulp = require('gulp')
	,	NwBuilder = require('node-webkit-builder')
	,	gutil = require('gulp-util')
  , livereload = require('gulp-livereload');

gulp.task('nw', function (callback) {
	var nw = new NwBuilder({
		version: 'latest',
		files: ['./**'],
		platforms: ['win','osx', 'linux32', 'linux64']
	});

	nw.on('log', function (mgs) {
		gutil.log('node-webkit-builder', mgs);
	});

	nw.build(function (err) {
		if (err) gutil.log('node-webkit-builder', err);

		callback();
		gutil.beep();
	});
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('app/**')
    .on('change', livereload.changed);
});
