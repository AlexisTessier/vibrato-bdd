'use strict';

function featuresTest(resources) {
	resources.testSuite.currentModuleName = 'VibratoBDD';

	require('./feature.can-be-instanciated')(resources);
	//require('./feature.run-a-test-suite')(resources);
};

module.exports = featuresTest;