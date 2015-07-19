'use strict';

(function () {

	var bundleTest = require('../test-suite');
	var testSuiteManager = require('../test-suite-manager');

	function closeWindow (delay) {
		window.setTimeout(function () {
			window.close();
		}, (typeof delay === 'number' ? delay : 0));
	}

	document.addEventListener("DOMContentLoaded", function(event) { 
		try{
			bundleTest();
		}
		catch(e){
			socket.emit('test-issue', e.message, e.stack);
		}

		testSuiteManager.exitProcessIfAllTestsAreDone();
	});

})();