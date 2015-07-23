'use strict';

require('./console-hack');

var resources = {
	VibratoBDD : require('../../lib'),
	testSuite :  require('./test-suite-manager'),
	validIdentifier : require('./valid-identifier'),
	unvalidIdentifierList : require('./unvalid-identifier-list'),
	specifications : require('../../specifications'),
	featureDescription : require('./feature-description'),
	notAFunctionList : require('./not-a-function-list'),
	markers : require('./markers')
};

module.exports = resources;