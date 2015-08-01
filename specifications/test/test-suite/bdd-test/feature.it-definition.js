'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function itDefinition(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to test a non feature
	As a Developper
	I Want to define test for my it clauses
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());
	var unvalidIdentifierList = resources.unvalidIdentifierList;

	var messages = resources.specifications.messages.itDefinition;

	testSuite.scenario('Access to step definition function', function(trace) {
		//describe('target').it
	})
	.scenario('Define the step with a function')
	.scenario('Define the step with a non function')
	.scenario('Alternate it and/but with and without step definition')
};

module.exports = feature;