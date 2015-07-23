'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function runATestSuite(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to use run lot of tests
	As a developper
	I Want to run a test suite
	*/

	var VibratoBDD = resources.VibratoBDD;
	var _require = resources.featureDescription.require;

	var mainValidIdentifier = 'run-a-test-suite-test';

	var bdd = VibratoBDD(mainValidIdentifier);

	testSuite.scenario("Run a test suite with features descriptions in it", function (trace) {
		//When i use the runTestSuite function
		var called = false;
		var featureCalled = false;

		bdd.runTestSuite(function () {
			called = true;
			_require('run-a-test-suite-fake-feature');
			_require('run-a-test-suite-fake-feature-two');

			assert.strictEqual(_.contains(resources.markers, 'run-a-test-suite-fake-feature'), true,
				trace('content of required module if runTestSuite must be called')
			);

			assert.strictEqual(_.contains(resources.markers, 'run-a-test-suite-fake-feature-two'), true,
				trace('content of required module if runTestSuite must be called')
			);

			assert.strictEqual(bdd.features.all.length, 2, trace("runTestSuite should add the features to bdd.features.all"));

			var oldAllOne = bdd.features.all[1].block;

			bdd.features.all[1].block = function () {
				featureCalled = true;

				oldAllOne.apply(this, arguments);
			};
		});

		//Then the first function parameter should be called
		//And the feature described in it must be correctly setted and also called

		assert.strictEqual(called, true, trace("runTestSuite must call the requireTestSuiteFunction parameter."));
		assert.strictEqual(bdd.features.started.length, 2, trace("runTestSuite should add the feature to bdd.features.started"));

		assert.strictEqual(typeof bdd.features.all[0], 'object', trace("runTestSuite should add the feature as an object"));
		assert.strictEqual(typeof bdd.features.all[1], 'object', trace("runTestSuite should add the feature as an object"));
		assert.strictEqual(featureCalled, true, trace("runTestSuite must actually call the features functions"));
	})

	.scenario("use runTestSuite method without requireTestSuiteFunction as first parameters", function (trace) {
		var errorMessage = resources.specifications.errorMessage.usingRunTestSuiteWithoutFunctionAsParameter;
		
		assert.throws(
		  function() {
		  	bdd.runTestSuite();
			_.forEach(resources.notAFunctionList, function (notAFunction) {
				bdd.runTestSuite(notAFunction);
			});
		  },
		  new RegExp(errorMessage),
		  trace('should throw an error with message : ' + errorMessage)
		);
	})

	.scenario("Run a test suite with no feature description in it", function (trace) {
		var errorMessage = resources.specifications.errorMessage.usingRunTestSuiteWithNoFeatureDescription;

		assert.throws(
		  function() {
		  	bdd.runTestSuite(function () {
		  	});
		  },
		  new RegExp(errorMessage),
		  trace('should throw an error with message : ' + errorMessage)
		);
	});
};

module.exports = feature;