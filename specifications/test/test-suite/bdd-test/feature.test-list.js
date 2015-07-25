'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function testList(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to know all the tests and their states
	As a Developper
	I Want an access to the test list property "testSuite"
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());

	testSuite.scenario("Access to testSuite", function (trace) {
		
		assert.strictEqual(typeof bdd.testSuite, 'object',
			trace('The property testSuite of a VibratoBDD instance should be an object'));

		var stateList = resources.testStateList;
		
		_.forEach(stateList, function (state) {
			assert.strictEqual(_.isArray(bdd.testSuite[state]), true,
				trace('the testSuite property of a VibratoBDD instance should contains an empty Array at key '+state));
			assert.strictEqual(bdd.testSuite[state].length, 0,
				trace('the testSuite property of a VibratoBDD instance should contains an empty Array at key '+state));
		});

	});
};

module.exports = feature;