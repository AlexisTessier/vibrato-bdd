'use strict';

var assert = require('assert');
var _ = require('lodash');

var scenario = "feature background", featureIdentifier = "";

var feature = function canBeInstanciated(moduleName, resources) {
	var testSuite = resources.testSuite;

	featureIdentifier = moduleName+" - "+_.words(feature.name).join(' ').toLowerCase();

	/*
	In order to use VibratoBDD
	As a developper
	I Want to create a instance of VibratoBDD
	*/

	/*scenario = "Using the factory with a valid identifier (a string)";

	scenario = "Using the factory without a valid identifier (a string)";

	scenario = "Using the factory with a yet used identifier";

	scenario = "Using the factory with an unused yet identifier";

	scenario = "Using the class with a valid identifier (a string)";

	scenario = "Using the class without a valid identifier (a string)";*/

	scenario = "Using the class without a valid identifier (a string)";
	
	testSuite.scenario(featureIdentifier, scenario, function () {
		
	});
};

function trace (message) {
	return (featureIdentifier+'\nscenario : '+scenario+' \n error : '+message);
}

module.exports = feature;