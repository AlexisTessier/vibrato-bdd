'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var batch = require('gulp-batch');
var sourcemaps = require('gulp-sourcemaps');

var watchTargetGlob = ["sources/*.js", "sources/*/*.js"];

var path = require('path');

gulp.task('babel', function (done) {
	gulp.src(watchTargetGlob)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({ optional: ["runtime"] }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/'))

		.on('end', function() {
		    done();
		});
});

gulp.task('build', ['babel']);

gulp.task('watch', ['build'], function () {
	watch(watchTargetGlob, batch(function (events, done) {
		gulp.start('build', done);
	}));
});

gulp.task('default', ['build']);