'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _ = require('lodash');

var specifications = require('../specifications');
var messages = specifications.messages;

/*---------------------*/
/*---------------------*/
/*---------------------*/

var indexedFeatures = _Symbol();

var VibratoBDD = (function () {
	function VibratoBDD() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$identifier = _ref.identifier;
		var identifier = _ref$identifier === undefined ? null : _ref$identifier;

		_classCallCheck(this, VibratoBDD);

		this.identifier = identifierIsValid(identifier) ? identifier : null;

		initFeatureList.call(this);

		this.describe = {
			feature: featureDescriberGenerator(this)
		};
	}

	_createClass(VibratoBDD, [{
		key: 'runTestSuite',
		value: function runTestSuite(requireTestSuiteFunction) {
			var tagList = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

			initFeatureList.call(this);

			if (_.isFunction(requireTestSuiteFunction)) {
				requireTestSuiteFunction();
			} else {
				throw new Error(specs.errorMessage.usingRunTestSuiteWithoutFunctionAsParameter);
			}

			if (this.features.all.length <= 0) {
				throw new Error(specs.errorMessage.usingRunTestSuiteWithNoFeatureDescription);
			}

			start.call(this);
		}
	}]);

	return VibratoBDD;
})();

function initFeatureList() {
	this[indexedFeatures] = {};

	this.features = {
		all: [],
		started: [],
		running: [],
		passed: [],
		failed: []
	};
}

function start() {
	var _this = this;

	_.forEach(this[indexedFeatures], function (feature) {
		feature.block();
		_this.features.started.push(feature);
	});
}

function setFeatureNamed(name, block) {
	this.features.all.push(this[indexedFeatures][_.camelCase(name)] = {
		name: name,
		description: '',
		background: [],
		scenarioList: [],
		block: block
	});
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

function identifierIsValid(identifier) {
	return _.isString(identifier) && _.trim(identifier).length > 0;
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

function featureDescriptionSetterGenerator(bdd, featureName) {
	return function featureDescriptionSetter() {};
};

function featureDescriberGenerator(bdd) {
	var featureDescriber = function featureDescriber(featureName) {
		setFeatureNamed.call(bdd, featureName, function () {});

		return featureDescriptionSetterGenerator(bdd, featureName);
	};

	return featureDescriber;
}

/*---------------------*/
/*---------------------*/
/*---------------------*/

var VibratoBDDPool = {};

function VibratoBDDFactory(identifier) {
	if (!identifierIsValid(identifier)) {
		throw new Error(messages.factory.error.usingTheFactoryWithAnUnvalidIdentifier(identifier));
	}

	return VibratoBDDPool[identifier] || (VibratoBDDPool[identifier] = new VibratoBDD({ identifier: identifier }));
}

VibratoBDDFactory['class'] = VibratoBDD;

exports['default'] = VibratoBDDFactory;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map