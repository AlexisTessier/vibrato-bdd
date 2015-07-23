'use strict';

var specifications = {
	errorMessage : {
	
	usingTheFactoryWithoutValidIdentifier : 
	"The VibratoBDD function needs a string as identifier to instantiate and save a VibratoBDD object or retrieve a previously saved instance",
	usingRunTestSuiteWithoutFunctionAsParameter :
	"runTestSuite method needs a function as first parameter",
	usingRunTestSuiteWithNoFeatureDescription : 
	"Your test suite must contain at least one feature description"

	},

	
	warningMessage : {
	}
};

module.exports = specifications;