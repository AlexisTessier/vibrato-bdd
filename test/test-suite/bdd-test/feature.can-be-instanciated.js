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

	var VibratoBDD = resources.VibratoBDD;
	var unvalidIdentifierList = resources.unvalidIdentifierList;

	testSuite.scenario("Using the factory with a valid identifier (a non empty string)", function (trace) {
		var validIdentifier = resources.validIdentifier.new();
		var bdd = VibratoBDD(validIdentifier);

		assert.strictEqual((bdd instanceof VibratoBDD.class), true, trace('VibratoBDD function should return an instance of VibratoBDD.class'));
		assert.strictEqual(bdd.identifier, validIdentifier, trace('bdd.identifier should be equal to validIdentifier'));
	})

	.scenario("Using the factory without a valid identifier (a non empty string)", function (trace) {
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

	.scenario("Using the factory with a yet used identifier", function (trace) {
		//Given I have yet defined a VibratoBDD instance from factory
		var validIdentifier = resources.validIdentifier.new();
		var firstBDDInstance = VibratoBDD(validIdentifier);

		//When i use the factory with the same identifier
		var secondBDDInstance = VibratoBDD(validIdentifier);

		//Then it returns the same object
		firstBDDInstance.someKeyJustForTesting = "some key just for testing";

		assert.strictEqual((firstBDDInstance instanceof VibratoBDD.class), true, trace('VibratoBDD function should return an instance of VibratoBDD.class'));
		assert.strictEqual((secondBDDInstance instanceof VibratoBDD.class), true, trace('VibratoBDD function should return an instance of VibratoBDD.class'));
		assert.strictEqual(firstBDDInstance.someKeyJustForTesting, secondBDDInstance.someKeyJustForTesting,
			trace('should return the VibratoBDD instance previously created')
		);

	})

	.scenario("Using the class with a valid identifier (a string)", function (trace) {
		var validIdentifier = resources.validIdentifier.new();
		
		var bdd = new VibratoBDD.class({identifier : validIdentifier});

		assert.strictEqual((bdd instanceof VibratoBDD.class), true, trace('new VibratoBDD.class() should return an instance of VibratoBDD.class'));
		assert.strictEqual(bdd.identifier, validIdentifier, trace('bdd.identifier should be equal to validIdentifier'));
	})

	.scenario("Using the class without a valid identifier (a non empty string)", function (trace) {
		var bdd = new VibratoBDD.class();

		assert.strictEqual(bdd.identifier, null, trace('bdd.identifier should be null'));

		_.forEach(unvalidIdentifierList, function(unvalidIdentifier) {
		  	bdd = new VibratoBDD.class({identifier : unvalidIdentifier});

		  	assert.strictEqual(bdd.identifier, null, trace('bdd.identifier should be null'));
		});
	})
};

module.exports = feature;