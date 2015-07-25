var _ = require('lodash');

var specifications = require('../specifications');
var messages = specifications.messages;

/*---------------------*/
/*---------------------*/
/*---------------------*/

//private properties
var indexedFeatures = Symbol(),
	indexedDescriptions = Symbol();

//private instance method
var	initTestList = Symbol(),
	initDescriptionList = Symbol(),
	initFeatureList = Symbol(),

	initDescribe = Symbol(),

	createFeatureDescriber = Symbol(),
	createFeatureDescriptionSetter = Symbol(),
	setFeatureNamed = Symbol(),

	start = Symbol();

//private class method
var createEmptyStateObject = Symbol(),
	identifierIsValid = Symbol(),
	formatIdentifier = Symbol();

class VibratoBDD {
	constructor({
		identifier = null
	}={}) {

		this.identifier = VibratoBDD[identifierIsValid](identifier) ? identifier : null;

		this[initTestList]();

		this[initDescribe]();
	}

	/*Public API*/

	runTestSuite(requireTestSuiteFunction, tagList = ""){
		initFeatureList.call(this);

		if (_.isFunction(requireTestSuiteFunction)) {
			requireTestSuiteFunction();
		}
		else{
			throw new Error(specs.errorMessage.usingRunTestSuiteWithoutFunctionAsParameter);
		}

		if (this.features.all.length <= 0) {
			throw new Error(specs.errorMessage.usingRunTestSuiteWithNoFeatureDescription);
		}

		start.call(this);
	}

	/*Private API*/

	//Init
	[initDescribe](){
		this.describe = function (topicName) {
		};
		this.describe.feature = this[createFeatureDescriber]();
	}

	[initTestList](){
		this.testSuite = VibratoBDD[createEmptyStateObject]();

		this[initDescriptionList]();
		this[initFeatureList]();
	}

	[initDescriptionList]() {
		this[indexedDescriptions] = {};

		this.descriptions = VibratoBDD[createEmptyStateObject]();
	}

	[initFeatureList]() {
		this[indexedFeatures] = {};

		this.features = VibratoBDD[createEmptyStateObject]();
	}

	//Run test suite
	[start]() {
		_.forEach(this[indexedFeatures], (feature)=>{
			feature.block();
			this.features.started.push(feature);
		});
	}

	//feature
	[createFeatureDescriber]() {
		var featureDescriber = (featureName) => {
			this[setFeatureNamed](featureName, function () {
			});

			return this[createFeatureDescriptionSetter](featureName);
		};

		return featureDescriber;
	}

	[createFeatureDescriptionSetter] (bdd, featureName) {
		return () => {
		};
	};

	[setFeatureNamed](name, block){
		this.features.all.push(this[indexedFeatures][VibratoBDD[formatIdentifier](name)] = {
			name,
			description : "",
			background : [],
			scenarioList : [],
			block
		});
	}
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

VibratoBDD[createEmptyStateObject] = function() {
	return {
		all : [],
		started : [],
		running : [],
		passed : [],
		failed : []
	};
};

VibratoBDD[identifierIsValid] = function (identifier) {
	return (_.isString(identifier) && _.trim(identifier).length > 0);
};

VibratoBDD[formatIdentifier] = function (inputValue) {
	return _.camelCase(inputValue);
};

/*---------------------*/
/*---------------------*/
/*---------------------*/

var VibratoBDDPool = {};

function VibratoBDDFactory(identifier){
	if (!VibratoBDD[identifierIsValid](identifier)) {
		throw new Error(messages.factory.error.usingTheFactoryWithAnUnvalidIdentifier(identifier));
	}

	return (VibratoBDDPool[identifier] || (VibratoBDDPool[identifier] = new VibratoBDD({identifier})));
}

VibratoBDDFactory.class = VibratoBDD;

export default VibratoBDDFactory;