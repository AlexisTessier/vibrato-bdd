'use strict';

function featuresTest(resources) {
	resources.testSuite.currentModuleName = 'VibratoBDD';

	require('./feature.can-be-instanciated')(resources);
};

module.exports = featuresTest;