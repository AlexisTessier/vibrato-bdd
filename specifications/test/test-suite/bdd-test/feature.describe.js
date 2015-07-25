'use strict';

var assert = require('assert');
var _ = require('lodash');

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
	var messages = resources.specifications.messages.describe;

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

		assert.strictEqual(lastAddedDescriptions.state, "in the suite",
			trace("the description added must have the state \"in the suite\""));

		//And on the testSuite object
		assert.strictEqual(all.length, countTest+1, 
			trace("the describe function must add a test in the VibratoBDD instance testSuite.all Array"));

		var lastAddedtest = _.last(all);
		assert.strictEqual(lastAddedtest.type, "description",
			trace("the test added must have the type \"description\""));

		assert.deepEqual(lastAddedtest.test, lastAddedDescriptions,
			trace("the test property of added test must contain the last added description"));
	})
	.scenario("Using the describe function with an unvalid name", function (trace) {
		var notice = 'should throw an error with message : ';

		_.forEach(resources.unvalidIdentifierList, function (unvalidIdentifier) {
			var errorMesage = messages.error.startingADescriptionWithAUnvalidName(bdd, unvalidIdentifier);

			assert.throws(
				function() {
					bdd.describe(unvalidIdentifier);
				},
				resources.errorWithMessage(errorMessage),
				trace(notice + errorMessage)
			);
		});

		var errorMesage = messages.error.startingADescriptionWithAUnvalidName(bdd);

		assert.throws(
			function() {
				bdd.describe();
			},
			resources.errorWithMessage(errorMessage),
			trace(notice + errorMessage)
		);
	})
	.scenario("Using the describe function to describe something yet described (ignoring case and whitespace)", function (trace) {
		var notice = 'should throw an error with message : ';

		//Given I have described something
		var identifier = "	Describe  something for the 	describe   feature",
			cleanIdentifier = "describe something for the describe feature";

		var identifier2 = "	Describe  other thing for the 	describe   feature",
			cleanIdentifier2 = "describe other thing for the describe feature";

		bdd.describe(identifier);
		bdd.describe(cleanIdentifier2);

		//When I try to redescribe the same thing
		//Then I have an error
		/*assert.throws(
			function() {
				var errorMessage = messages.error.
				bdd.describe(identifier);
			},
			resources.errorWithMessage(errorMessage),
			trace(notice + errorMessage)
		);*/
	})
};

module.exports = feature;