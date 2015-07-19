'use strict';

function featuresTest(moduleName, resources) {
	require('./feature.can-be-instanciated')(moduleName, resources);
};

module.exports = featuresTest;