'use strict';

function featuresTest(resources) {
	resources.testSuite.currentModuleName = 'VibratoBDD';

	require('./feature.can-be-instanciated')(resources);
	require('./feature.factory')(resources);
	require('./feature.test-list')(resources);
	require('./feature.description-list')(resources);
	//require('./feature.describe')(resources);
	//require('./feature.feature-list')(resources);
	//require('./feature.feature')(resources);
};

module.exports = featuresTest;