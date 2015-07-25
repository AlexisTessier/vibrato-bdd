'use strict';

var assert = require('assert');

var feature = function _describe(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In Order to write my tests
	As a developper
	I Want a describe function
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());

	testSuite.scenario("Get the describe function of an instance", function (trace) {
		assert.strictEqual(typeof bdd.describe, 'function', trace('A VibratoBDD instance must have a describe property which is a function'));
		assert.strictEqual(typeof bdd.describe.feature, 'function', trace('The describe function must have a function feature as property'));
	})

	.scenario("Using the describe function with a valid name (a non empty string)", function (trace) {
		//Given I have a topic name
		var validTopicName = resources.validIdentifier.new();

		var all = bdd.testSuite.all,
			countTest = all.length;

		var allDescriptions = bdd.descriptions.all,
			countDescription = allDescriptions.length;
		//When I add a simple description
		bdd.describe(validTopicName);

		//Then a test object is setted on the descriptions.all array
		assert.strictEqual(allDescriptions.length, countDescription+1, 
			trace("the describe function must add a description in the VibratoBDD instance descriptions.all Array"));

		var lastAddedDescriptions = _.last(allDescriptions);
		assert.strictEqual(typeof lastAddedDescriptions, "object",
			trace("a description in descriptions property should be an object"));

		assert.strictEqual(lastAddedDescriptions.name, validName,
			trace("the description added must have the correct name"));

		assert.strictEqual(_.isArray(lastAddedDescriptions.specifications), true,
			trace("the description added must have a specifications Array empty"));
		assert.strictEqual(lastAddedDescriptions.specifications.length, 0,
			trace("the description added must have a specifications Array empty"));
		
		assert.strictEqual(typeof lastAddedDescriptions.block, 'function',
			trace("the description added must have an block function"));

		//And on the testSuite object
		var lastAddedtest = _.last(all);
	})
	.scenario("Using the describe function with an unvalid name")
	.scenario("Using the describe function to describe someyhing yet described (ignoring whitespace)")
};

module.exports = feature;