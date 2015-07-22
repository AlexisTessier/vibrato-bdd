'use strict';

var assert = require('assert');

var feature = function OutlineExamples(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to use VibratoBDD
	As a developper
	I Want to create a instance of VibratoBDD
	*/
};

module.exports = feature;