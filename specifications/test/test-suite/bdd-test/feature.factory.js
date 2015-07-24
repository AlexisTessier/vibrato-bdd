'use strict';

var assert = require('assert');
var _ = require('lodash');

var feature = function factory(resources) {
	var testSuite = resources.testSuite;

	console.cleanContent();

	testSuite.describe.feature(feature);

	/*
	In order to separate my features descriptions
	As a developper
	I Want to retrieve an instance of VibratoBDD between modules
	*/

	/*Given the factory*/
	var VibratoBDDFactory = resources.VibratoBDD;
	var VibratoBDD = VibratoBDDFactory.class;

	var unvalidIdentifierList = resources.unvalidIdentifierList;
	var messages = resources.specifications.messages.factory;

	testSuite.scenario("Using the factory with a valid identifier (a non empty string)", function (trace) {
		var validIdentifier = resources.validIdentifier.new();
		var bdd = VibratoBDDFactory(validIdentifier);

		assert.strictEqual((bdd instanceof VibratoBDD), true, trace('VibratoBDD factory should return an instance of VibratoBDD.class'));
		assert.strictEqual(bdd.identifier, validIdentifier, trace('The instance returned by factory should have an identifier equal to the used parameter'));
	})
	
	.scenario("Using the factory with an unvalid identifier", function (trace) {
		var notice = 'should throw an error with message : ';

		_.forEach(unvalidIdentifierList, function(unvalidIdentifier) {
			var errorMessage = messages.error.usingTheFactoryWithAnUnvalidIdentifier(unvalidIdentifier);
			
			assert.throws(
			  function() {
			    VibratoBDDFactory(unvalidIdentifier);
			  },
			  resources.errorWithMessage(errorMessage),
			  trace(notice + errorMessage)
			);
		});

		var errorMessage = messages.error.usingTheFactoryWithAnUnvalidIdentifier();

		assert.throws(
		  function() {
		    VibratoBDDFactory();
		  },
		  resources.errorWithMessage(errorMessage),
		  trace(notice + errorMessage)
		);
	})

	.scenario("Using the factory with a yet used identifier", function (trace) {
		//Given I have yet defined a VibratoBDD instance from factory
		var validIdentifier = resources.validIdentifier.new();
		var firstBDDInstance = VibratoBDDFactory(validIdentifier);

		//When i use the factory with the same identifier
		var secondBDDInstance = VibratoBDDFactory(validIdentifier);

		//Then it returns the same object
		firstBDDInstance.someKeyJustForTesting = "some key just for testing";

		assert.strictEqual((firstBDDInstance instanceof VibratoBDD), true, trace('VibratoBDD factory function should return an instance of VibratoBDD'));
		assert.strictEqual((secondBDDInstance instanceof VibratoBDD), true, trace('VibratoBDD factory function should return an instance of VibratoBDD'));
		assert.strictEqual(firstBDDInstance.someKeyJustForTesting, secondBDDInstance.someKeyJustForTesting,
			trace('should return the VibratoBDD instance previously created')
		);
	})
};

module.exports = feature;