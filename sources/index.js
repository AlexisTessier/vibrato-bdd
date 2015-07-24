var _ = require('lodash');

var specifications = require('../specifications');
var messages = specifications.messages;

/*---------------------*/
/*---------------------*/
/*---------------------*/

var indexedFeatures = Symbol();

class VibratoBDD {
	constructor({
		identifier = null
	}={}) {

		this.identifier = identifierIsValid(identifier) ? identifier : null;

		initFeatureList.call(this);

		this.describe = {
			feature : featureDescriberGenerator(this)
		};
	}

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
}

function initFeatureList() {
	this[indexedFeatures] = {};

	this.features = {
		all : [],
		started : [],
		running : [],
		passed : [],
		failed : []
	};
}

function start() {
	_.forEach(this[indexedFeatures], (feature)=>{
		feature.block();
		this.features.started.push(feature);
	});
}

function setFeatureNamed(name, block){
	this.features.all.push(this[indexedFeatures][_.camelCase(name)] = {
		name,
		description : "",
		background : [],
		scenarioList : [],
		block
	});
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

function identifierIsValid (identifier) {
	return (_.isString(identifier) && _.trim(identifier).length > 0);
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

function featureDescriptionSetterGenerator (bdd, featureName) {
	return function featureDescriptionSetter () {
	};
};

function featureDescriberGenerator (bdd) {
	var featureDescriber = function featureDescriber(featureName) {
		setFeatureNamed.call(bdd, featureName, function () {
		});

		return featureDescriptionSetterGenerator(bdd, featureName);
	};

	return featureDescriber;
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

var VibratoBDDPool = {};

function VibratoBDDFactory(identifier){
	if (!identifierIsValid(identifier)) {
		throw new Error(messages.factory.error.usingTheFactoryWithAnUnvalidIdentifier(identifier));
	}

	return (VibratoBDDPool[identifier] || (VibratoBDDPool[identifier] = new VibratoBDD({identifier})));
}

VibratoBDDFactory.class = VibratoBDD;

export default VibratoBDDFactory;