'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var traceur = require('gulp-traceur');
var batch = require('gulp-batch');

var watchTargetGlob = ["sources/*.js", "sources/*/*.js"];

var path = require('path');

gulp.task('build', function () {
	gulp.src(watchTargetGlob)
		.pipe(plumber())
		.pipe(traceur())
		.pipe(gulp.dest('build'))
});

gulp.task('watch', ['build'], function () {
	watch(watchTargetGlob, batch(function (events, done) {
		gulp.start('build', done);
	}));
});

gulp.task('default', ['build']);