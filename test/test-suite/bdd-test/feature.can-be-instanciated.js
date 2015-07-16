'use strict';

var assert = require('assert');

var moduleName = "", scenario = "feature background";

var feature = function canBeInstanciated(name, resources) {
	moduleName = name;

	/*
	In order to use VibratoBDD
	As a developper
	I Want to create a instance of VibratoBDD
	*/

	scenario = "Using the factory with a valid identifier (a string)";

		//given 

	scenario = "Using the factory without a valid identifier (a string)";

	scenario = "Using the factory with a yet used identifier";

	scenario = "Using the factory with an unused yet identifier";

	scenario = "Using a the class with a valid identifier (a string)";

	scenario = "Using a the class without a valid identifier (a string)";

	assert.strictEqual(typeof scenario, typeof 5, trace('test failed'));
};

function trace (message) {
	return (moduleName+' - '+feature.name+'\nscenario : '+scenario+' \n error : '+message);
}

module.exports = feature;