'use strict';

var _ = require('lodash');

var scenarioDoneList = {};

var testSuiteManager = {
	addScenario : function (name) {
		scenarioDoneList[name] = false;

		return name;
	},

	scenarioEnd : function (name) {
		scenarioDoneList[name] = true;
	},

	exitProcessIfAllTestsAreDone : function () {
		setInterval(function () {
			if(_.every(scenarioDoneList, function(scenarioDone) {
				return scenarioDone;
			})){
				console.log("All tests done : process exit");
				if (_.isObject(process)){
					if (_.isFunction(process.exit)) {
						process.exit();
					}
				}
			}
		}, 500);
	}
};

module.exports = testSuiteManager;