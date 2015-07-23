'use strict';

var assert = require('assert');
var _ = require('lodash')

var feature = function featureDescription(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to test a feature
	As a developper
	I Want to describe it with one or many lines 
	*/

	var bdd = resources.VibratoBDD('feature-description-test');

	testSuite.scenario("describe with one line", function (trace) {
		var description = "My first feature description";
		bdd.describe.feature('my-first-feature')(
			description
		)

		var actualDescription = _.last(bdd.features.all).description;

		assert.strictEqual(actualDescription, description,
			trace("feature description should set the good description")
		);
	})
	.scenario("describe with many lines", function (trace) {
		var description = "My\ntest\nlines";
		bdd.describe.feature('my-second-feature')(
			"My", "test", "lines"
		)

		var actualDescription = _.last(bdd.features.all).description;

		assert.strictEqual(actualDescription, description,
			trace("feature description should be a concatenation of all lines with a new line character between each")
		);
	})
	.scenario("describe with no line", function (trace) {
		var errorMessage = resources.specifications.errorMessage.describingAFeatureWithNoLines;

		assert.throws(
		  function() {
		    bdd.describe.feature('my-third-feature')();
		  },
		  new RegExp(errorMessage),
		  trace('should throw an error with message : ' + errorMessage)
		);
	})
	.scenario("describe with one argument which is not valid (a non empty string)")
	.scenario("describe a yet described feature")
};

module.exports = feature;