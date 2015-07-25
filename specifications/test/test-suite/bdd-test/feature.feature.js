'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function feature(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to describe feature
	As a Developper
	I Want a function to start description of a feature
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());
	var unvalidIdentifierList = resources.unvalidIdentifierList;

	var messages = resources.specifications.messages.feature;

	testSuite.scenario('Starting a feature with valid name (a non empty string)', function (trace) {
		//Given I have a feature name
		var validName = resources.validIdentifier.new();

		var all = bdd.features.all,
			countFeature = all.length;
		//When I add the feature
		bdd.describe.feature(validName)

		//Then a feature object is setted on the features.all array
		assert.strictEqual(all.length, countFeature+1, 
			trace("the feature function must add a feature in the VibratoBDD instance features.all"));

		var lastAddedFeature = _.last(all);
		assert.strictEqual(typeof lastAddedFeature, "object",
			trace("a feature in features property should be an object"));

		assert.strictEqual(lastAddedFeature.name, validName,
			trace("the feature added must have the correct name"));

		assert.strictEqual(lastAddedFeature.description, "",
			trace("the feature added must have an empty description"));

		assert.strictEqual(lastAddedFeature.description, "",
			trace("the feature added must have an empty description"));

		assert.strictEqual(_.isArray(lastAddedFeature.background), true,
			trace("the feature added must have an background Array empty"));
		assert.strictEqual(lastAddedFeature.background.length, 0,
			trace("the feature added must have an background Array empty"));

		assert.strictEqual(_.isArray(lastAddedFeature.scenarioList), true,
			trace("the feature added must have an scenarioList Array empty"));
		assert.strictEqual(lastAddedFeature.scenarioList.length, 0,
			trace("the feature added must have an scenarioList Array empty"));
		
		assert.strictEqual(typeof lastAddedFeature.block, 'function',
			trace("the feature added must have an block function"));
	})

	.scenario('Starting a feature with a unvalid name', function (trace) {
		var notice = 'should throw an error with message : ';

		var errorMessage = messages.error.startingAFeatureWithAUnvalidName(bdd.identifier);

		assert.throws(
			function() {
				bdd.describe.feature();
			},
			resources.errorWithMessage(errorMessage),
			trace(notice + errorMessage)
		);

		_.forEach(unvalidIdentifierList, function (unvalidIdentifier) {
			var errorMessage = messages.error.startingAFeatureWithAUnvalidName(bdd.identifier, unvalidIdentifier);

			assert.throws(
				function() {
					bdd.describe.feature();
				},
				resources.errorWithMessage(errorMessage),
				trace(notice + errorMessage)
			);
		});
	})
	.scenario('Starting a yet defined feature (ignoring whitespace)')
};

module.exports = feature;