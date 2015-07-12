'use strict';

function featuresTest(resources) {
	require('./feature.can-be-instanciated')('VibratoBDD', resources);
};

module.exports = featuresTest;