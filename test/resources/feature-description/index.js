'use strict';

var VibratoBDD = require('../../../lib');
var _ = require('lodash');

var featureDescriptionList = {
	runATestSuiteFakeFeature : function () {
		require('./run-a-test-suite-fake-feature')(VibratoBDD);
	},
	runATestSuiteFakeFeatureTwo : function () {
		require('./run-a-test-suite-fake-feature-two')(VibratoBDD);
	}
};

var featureDescription = {
	require : function (moduleName) {
		featureDescriptionList[_.camelCase(moduleName)]();
	}
};

module.exports = featureDescription;