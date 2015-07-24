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

	/*Given the class*/
	var VibratoBDD = resources.VibratoBDD.class;

	var unvalidIdentifierList = resources.unvalidIdentifierList;

	testSuite

	.scenario("Using a valid identifier (a non empty string)", function (trace) {
		var validIdentifier = resources.validIdentifier.new();
		
		var bdd = new VibratoBDD({identifier : validIdentifier});

		assert.strictEqual((bdd instanceof VibratoBDD), true, trace('new VibratoBDD() should return an instance of VibratoBDD'));
		assert.strictEqual(bdd.identifier, validIdentifier, trace('The identifier of instance should be equal to identifier params'));
	})

	.scenario("Using an unvalid identifier", function (trace) {
		
		var notice = 'An instancied VibratoBDD with a unvalid identifier should have an identifier equal to null';

		var bdd = new VibratoBDD();
		assert.strictEqual(bdd.identifier, null, trace(notice));

		_.forEach(unvalidIdentifierList, function(unvalidIdentifier) {
		  	bdd = new VibratoBDD({identifier : unvalidIdentifier});

		  	assert.strictEqual(bdd.identifier, null, trace(notice));
		});
	});
};

module.exports = feature;