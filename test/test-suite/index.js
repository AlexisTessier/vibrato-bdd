'use strict';

function testSuite() {
	require('./bdd-test')(require('../resources'));
};

module.exports = testSuite;