'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function canBeInstanciated(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature);

	/*
	In order to use VibratoBDD
	As a developper
	I Want to create a instance of VibratoBDD
	*/

	//Given I required the VibratoBDD module
		var VibratoBDD = resources.VibratoBDD;
	//And I have a valid identifier
		var mainValidIdentifier = resources.validIdentifierList[0];
	//And unvalid identifier list
		var unvalidIdentifierList = resources.unvalidIdentifierList;

	testSuite.scenario("Using the factory with a valid identifier (a string)", function (trace) {
		var bdd = VibratoBDD(mainValidIdentifier);

		assert.strictEqual((bdd instanceof VibratoBDD.class), true, trace('VibratoBDD function should return an instance of VibratoBDD.class'));
		assert.strictEqual(bdd.identifier, mainValidIdentifier, trace('bdd.identifier should be equal to mainValidIdentifier'));
	})

	.scenario("Using the factory without a valid identifier (a string)", function (trace) {
		var errorMessage = resources.specifications.errorMessage.usingTheFactoryWithoutValidIdentifier;
		
		assert.throws(
		  function() {
		    VibratoBDD();
		    _.forEach(unvalidIdentifierList, function(unvalidIdentifier) {
		    	VibratoBDD(unvalidIdentifier);
		    });
		  },
		  new RegExp(errorMessage),
		  trace('should throw an error with message : ' + errorMessage)
		);
	})

	.scenario("Using the factory with a yet used identifier")

	.scenario("Using the factory with an unused yet identifier")

	.scenario("Using the class with a valid identifier (a string)")

	.scenario("Using the class without a valid identifier (a string)", function (trace) {
	})
};

module.exports = feature;