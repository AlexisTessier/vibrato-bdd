'use strict';

require('./console-hack');

var resources = {
	VibratoBDD : require('../../lib'),
	testSuite :  require('./test-suite-manager'),
	validIdentifierList : require('./valid-identifier-list'),
	unvalidIdentifierList : require('./unvalid-identifier-list'),
	specifications : require('../../specifications')
};

module.exports = resources;