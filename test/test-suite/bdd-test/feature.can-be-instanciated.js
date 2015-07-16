'use strict';

var assert = require('assert');

var moduleName = "", scenario = "feature background";

var feature = function canBeInstanciated(name, resources) {
	var testSuite = resources.testSuite;

	moduleName = name;

	/*
	In order to use VibratoBDD
	As a developper
	I Want to create a instance of VibratoBDD
	*/


	scenario = testSuite.addScenario("Using the factory with a valid identifier (a string)");

	testSuite.scenarioEnd(scenario); 

	scenario = testSuite.addScenario("Using the factory without a valid identifier (a string)");

	testSuite.scenarioEnd(scenario); 

	scenario = testSuite.addScenario("Using the factory with a yet used identifier");

	testSuite.scenarioEnd(scenario); 

	scenario = testSuite.addScenario("Using the factory with an unused yet identifier");

	testSuite.scenarioEnd(scenario); 

	scenario = testSuite.addScenario("Using a the class with a valid identifier (a string)");

	testSuite.scenarioEnd(scenario); 

	scenario = testSuite.addScenario("Using a the class without a valid identifier (a string)");

	testSuite.scenarioEnd(scenario); 

	//assert.strictEqual(typeof scenario, typeof 5, trace('test failed'));
};

function trace (message) {
	return (moduleName+' - '+feature.name+'\nscenario : '+scenario+' \n error : '+message);
}

module.exports = feature;