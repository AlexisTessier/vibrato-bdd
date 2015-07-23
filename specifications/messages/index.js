'use strict';

var messages = {

	canBeInstanciated : require('./can-be-instanciated')
/*
	errorMessage : {
	
	usingTheFactoryWithoutValidIdentifier : function (identifier) {
		return ""+
"The VibratoBDD function needs a string as identifier to instantiate and save a VibratoBDD object or retrieve a previously saved instance.\n"+
"\""+identifier+"\" isn't a valid identifier";

	},

	usingRunTestSuiteWithoutFunctionAsParameter : function (identifier, func) {
		return ""+
"VibratoBDD instance with identifier \""+identifier+"\" runTestSuite method needs a function as first parameter.\n"+
"\""+func+"\" isn't.";
	},

	usingRunTestSuiteWithNoFeatureDescription : function (identifier) {
		return ""+
+"Your test suite for VibratoBDD instance with identifier \""+identifier+"\" must contain at least one feature description";
	},

	describingAFeatureWithNoLines : function (identifier, featureName) {
		return ""+
"When you describe the feature, you indicate at least one line",
	}

	describingAFeatureWithAnUnvalidLine :
	"You describe a feature but one of your lines isn't a string or is empty",

	describingAYetDescribedFeature :
	"You are trying to describe a yet described feature"
	

	}
*/
};

module.exports = messages;