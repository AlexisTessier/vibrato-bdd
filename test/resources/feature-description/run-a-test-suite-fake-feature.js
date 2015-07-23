'use strict';

module.exports = function (VibratoBDD) {
	require('../markers').push('run-a-test-suite-fake-feature');

	VibratoBDD('run-a-test-suite-test')

	.describe.feature("Run a test suite FAKE FEATURE")
};