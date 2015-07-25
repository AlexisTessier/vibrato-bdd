'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function descriptionList(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to know all the simple descriptions tests and their states
	As a Developper
	I Want an access to the description list property "descriptions"
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());

	testSuite.scenario("Access to descriptions", function (trace) {
		
		assert.strictEqual(typeof bdd.descriptions, 'object',
			trace('The property descriptions of a VibratoBDD instance should be an object'));

		var stateList = resources.testStateList;
		
		_.forEach(stateList, function (state) {
			assert.strictEqual(_.isArray(bdd.descriptions[state]), true,
				trace('the descriptions property of a VibratoBDD instance should contains an empty Array at key '+state));
			assert.strictEqual(bdd.descriptions[state].length, 0,
				trace('the descriptions property of a VibratoBDD instance should contains an empty Array at key '+state));
		});

	});
};

module.exports = feature;