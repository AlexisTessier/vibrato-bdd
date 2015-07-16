'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var traceur = require('gulp-traceur');
var batch = require('gulp-batch');
var instrument  = require('gulp-instrument');

var watchTargetGlob = ["sources/*.js", "sources/*/*.js"];

var path = require('path');

gulp.task('coverage', function () {
    gulp.src(['lib/**.js'])
    	.pipe(plumber())
        .pipe(instrument())
        .pipe(gulp.dest('lib-cov'));

    gulp.src(['lib/build/**.js'])
    	.pipe(plumber())
        .pipe(instrument())
        .pipe(gulp.dest('lib-cov/build'));
})

gulp.task('traceur', function () {
	gulp.src(watchTargetGlob)
		.pipe(plumber())
		.pipe(traceur())
		.pipe(gulp.dest('lib/build'))
});

gulp.task('build', ['traceur'], function () {
	gulp.start('coverage');
});

gulp.task('watch', ['build'], function () {
	watch(watchTargetGlob, batch(function (events, done) {
		gulp.start('build', done);
	}));
});

gulp.task('default', ['build']);