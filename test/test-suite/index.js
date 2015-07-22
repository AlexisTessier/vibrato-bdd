'use strict';

var resources = require('../resources');

function testSuite(context) {
	resources.testSuite.setContext(context);

	require('./bdd-test')(resources);
};

module.exports = testSuite;