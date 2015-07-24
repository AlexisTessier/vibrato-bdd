'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function featureList(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to know all features and their states
	As a Developper
	I Want an access to the feature list
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());

	testSuite.scenario("Access to features", function (trace) {
		
		assert.strictEqual(typeof bdd.features, 'object',
			trace('The property features of a VibratoBDD instance should be an object'));

		var stateList = ['all', 'started', 'running', 'passed', 'failed'];
		
		_.forEach(stateList, function (state) {
			assert.strictEqual(_.isArray(bdd.features[state]), true,
				trace('the features property of a VibratoBDD instance should contains an empty Array at key '+state));
			assert.strictEqual(bdd.features[state].length, 0,
				trace('the features property of a VibratoBDD instance should contains an empty Array at key '+state));
		});

	});
};

module.exports = feature;