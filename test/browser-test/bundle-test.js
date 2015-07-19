'use strict';

(function () {
	var bundleTest = require('../test-suite');
	var testSuite = require('../test-suite-manager');

	document.addEventListener("DOMContentLoaded", function(event) { 
		try{
			bundleTest('browser');
		}
		catch(e){
			testSuite.issue(e.message+'\n'+e.stack);
		}

		testSuite.exitProcessIfAllTestsAreDone();
	});
})();