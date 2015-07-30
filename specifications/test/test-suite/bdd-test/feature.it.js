'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function it(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature)

	/*
	In order to describe a non feature
	As a Developper
	I Want to use a simple description syntax
	*/

	var bdd = resources.VibratoBDD(resources.validIdentifier.new());
	var unvalidIdentifierList = resources.unvalidIdentifierList;

	var messages = resources.specifications.messages.it;

	testSuite.scenario('Access to It function', function(trace) {
		//describe('target').it
	})
	.scenario('Using It function with a valid assertion parameter (a non empty string)')
	.scenario('Using It function with an unvalid assertion parameter')
	.scenario('Chaining multiple with and/but keys')
};

module.exports = feature;