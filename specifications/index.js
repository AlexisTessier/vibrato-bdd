'use strict';

var specifications = {
	errorMessage : {
	
	usingTheFactoryWithoutValidIdentifier : 
	"The VibratoBDD function needs a string as identifier to instantiate and save a VibratoBDD object or retrieve a previously saved instance",
	usingRunTestSuiteWithoutFunctionAsParameter :
	"runTestSuite method needs a function as first parameter",
	usingRunTestSuiteWithNoFeatureDescription : 
	"Your test suite must contain at least one feature description",
	describingAFeatureWithNoLines :
	"When you describe a feature, you indicate at least one line",
	describingAFeatureWithAnUnvalidLine :
	"You describe a feature but one of your lines isn't a string or is empty"
	},

	
	warningMessage : {
	}
};

module.exports = specifications;