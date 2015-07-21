'use strict';

var assert = require('assert');

var moduleName = "", scenario = "feature background";

var feature = function canBeInstanciated(name, resources) {
	var testSuite = resources.testSuite;

	moduleName = name;

	var bdd = new resources.VibratoBDD();

	/*
	In order to use VibratoBDD
	As a developper
	I Want to create a instance of VibratoBDD
	*/

	scenario = "Using the factory with a valid identifier (a string)";

	scenario = "Using the factory without a valid identifier (a string)";

	scenario = "Using the factory with a yet used identifier";

	scenario = "Using the factory with an unused yet identifier";

	scenario = "Using the class with a valid identifier (a string)";

	scenario = "Using the class without a valid identifier (a string)";

	if (testSuite.context.isBrowser) {
		console.log('hello browser');
		//assert.strictEqual(typeof scenario, typeof 5, trace('test failed'));
	}
	else{
		console.log('hello server');
	}
};

function trace (message) {
	return (moduleName+' - '+feature.name+'\nscenario : '+scenario+' \n error : '+message);
}

module.exports = feature;