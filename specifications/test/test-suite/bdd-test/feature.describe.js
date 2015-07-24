'use strict';

var assert = require('assert');

var feature = function background(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	A VibratoBDD instance must have a describe property which is an object with one function "feature"
	*/

	testSuite.scenario('Get the describe object of an instance', function (trace) {
		var bdd = resources.VibratoBDD(resources.validIdentifier.new());

		assert.strictEqual(typeof bdd.describe, 'object', trace('A VibratoBDD instance must have a describe property which is an object'));
		assert.strictEqual(typeof bdd.describe.feature, 'function', trace('The describe property must have a function feature'));
	})
};

module.exports = feature;