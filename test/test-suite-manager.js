'use strict';

var _ = require('lodash');

var scenarioDoneList = {};

var contextList = ['server', 'browser'];

var log = require('./log');

var testSuiteManager = {
	addScenario : function (name) {
		scenarioDoneList[name] = false;

		return name;
	},
	scenarioEnd : function (name) {
		scenarioDoneList[name] = true;
	},
	context : {},
	setContext : function (contextName) {
		for(var i=0, imax=contextList.length; i<imax;i++){
			var possibleContext = contextList[i],
				contextKey = _.camelCase('is-'+possibleContext);

			testSuiteManager.context[contextKey] = (contextName === possibleContext);
		}
	},
	exitProcessIfAllTestsAreDone : function () {
		setInterval(function () {
			if(_.every(scenarioDoneList, function(scenarioDone) {
				return scenarioDone;
			})){
				console.log("All tests done : process exit");
				if(testSuiteManager.context.isBrowser){
					socket.emit('test-finished');
				}
				else if (testSuiteManager.context.isServer){
					if (_.isFunction(process.exit)) {
						process.exit();
					}
				}
			}
		}, 500);
	},
	issue : function (message) {
		if(testSuiteManager.context.isBrowser){
			socket.emit('test-issue', message);
		}
		else if (testSuiteManager.context.isServer){
			throw new Error(message);
		}
	},
	notice : function (message) {
		if(testSuiteManager.context.isBrowser){
			socket.emit('test-notice', message);
		}
		else if (testSuiteManager.context.isServer){
			log.notice(message);
		}
	}
};

module.exports = testSuiteManager;