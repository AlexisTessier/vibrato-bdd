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

//private properties
var indexedFeatures = _Symbol(),
    indexedDescriptions = _Symbol();

//private instance method
var initTestList = _Symbol(),
    initDescriptionList = _Symbol(),
    initFeatureList = _Symbol(),
    initDescribe = _Symbol(),
    createFeatureDescriber = _Symbol(),
    createFeatureDescriptionSetter = _Symbol(),
    setFeatureNamed = _Symbol(),
    start = _Symbol();

//private class method
var createEmptyStateObject = _Symbol(),
    identifierIsValid = _Symbol(),
    formatIdentifier = _Symbol();

var VibratoBDD = (function () {
	function VibratoBDD() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$identifier = _ref.identifier;
		var identifier = _ref$identifier === undefined ? null : _ref$identifier;

		_classCallCheck(this, VibratoBDD);

		this.identifier = VibratoBDD[identifierIsValid](identifier) ? identifier : null;

		this[initTestList]();

		this[initDescribe]();
	}

	_createClass(VibratoBDD, [{
		key: 'runTestSuite',

		/*Public API*/

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
	}, {
		key: initDescribe,

		/*Private API*/

		//Init
		value: function value() {
			this.describe = function (topicName) {};
			this.describe.feature = this[createFeatureDescriber]();
		}
	}, {
		key: initTestList,
		value: function value() {
			this.testSuite = VibratoBDD[createEmptyStateObject]();

			this[initDescriptionList]();
			this[initFeatureList]();
		}
	}, {
		key: initDescriptionList,
		value: function value() {
			this[indexedDescriptions] = {};

			this.descriptions = VibratoBDD[createEmptyStateObject]();
		}
	}, {
		key: initFeatureList,
		value: function value() {
			this[indexedFeatures] = {};

			this.features = VibratoBDD[createEmptyStateObject]();
		}
	}, {
		key: start,

		//Run test suite
		value: function value() {
			var _this = this;

			_.forEach(this[indexedFeatures], function (feature) {
				feature.block();
				_this.features.started.push(feature);
			});
		}
	}, {
		key: createFeatureDescriber,

		//feature
		value: function value() {
			var _this2 = this;

			var featureDescriber = function featureDescriber(featureName) {
				_this2[setFeatureNamed](featureName, function () {});

				return _this2[createFeatureDescriptionSetter](featureName);
			};

			return featureDescriber;
		}
	}, {
		key: createFeatureDescriptionSetter,
		value: function value(bdd, featureName) {
			return function () {};
		}
	}, {
		key: setFeatureNamed,
		value: function value(name, block) {
			this.features.all.push(this[indexedFeatures][VibratoBDD[formatIdentifier](name)] = {
				name: name,
				description: '',
				background: [],
				scenarioList: [],
				block: block
			});
		}
	}]);

	return VibratoBDD;
})();

/*---------------------*/
/*---------------------*/
/*---------------------*/

VibratoBDD[createEmptyStateObject] = function () {
	return {
		all: [],
		started: [],
		running: [],
		passed: [],
		failed: []
	};
};

VibratoBDD[identifierIsValid] = function (identifier) {
	return _.isString(identifier) && _.trim(identifier).length > 0;
};

VibratoBDD[formatIdentifier] = function (inputValue) {
	return _.camelCase(inputValue);
};

/*---------------------*/
/*---------------------*/
/*---------------------*/

var VibratoBDDPool = {};

function VibratoBDDFactory(identifier) {
	if (!VibratoBDD[identifierIsValid](identifier)) {
		throw new Error(messages.factory.error.usingTheFactoryWithAnUnvalidIdentifier(identifier));
	}

	return VibratoBDDPool[identifier] || (VibratoBDDPool[identifier] = new VibratoBDD({ identifier: identifier }));
}

VibratoBDDFactory['class'] = VibratoBDD;

exports['default'] = VibratoBDDFactory;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map