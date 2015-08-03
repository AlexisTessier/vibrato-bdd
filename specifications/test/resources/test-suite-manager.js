'use strict';

var _ = require('lodash');
var chalk = require('chalk');

var scenarioDoneList = {};

var contextList = ['server', 'browser'];

var testSuiteManager = {
	context : {},
	setContext : function (contextName) {
		for(var i=0, imax=contextList.length; i<imax;i++){
			var possibleContext = contextList[i],
				contextKey = _.camelCase('is-'+possibleContext),
				needContextKey = _.camelCase('need-'+possibleContext);

			testSuiteManager.context[contextKey] = (contextName === possibleContext);
			testSuiteManager.context[needContextKey] = (function (currentContextKey) {
				var func = function needSomeContext(callback) {
					if(testSuiteManager.context[currentContextKey]){
						callback();
					}
					else{
						try{
							callback();
						}
						catch(e){
							var notice = 'Error catched because test need context '+(_.kebabCase(currentContextKey).split('-')[1]);
							console.log(testSuiteManager.context.isServer ? chalk.yellow(notice) : notice);
						}
					}
				};
				return func;
			})(contextKey);
		}
	},
	scenario : function scenario(scenarioName, scenarioTest){
		var traceStartMarker = '#trace : ';
		if (typeof scenarioTest === "function") {
			var trace = (function (featureID) {
				return (function (message) {
					return (traceStartMarker+featureID+'\nscenario : '+scenarioName+' \n trace : '+message);
				});
			})(testSuiteManager.currentFeatureIdentifier);

			var testFunction = function () {
				try{
					scenarioTest(trace);
				}
				catch(e){
					e.message = e.message.indexOf(traceStartMarker) >= 0 ? e.message : trace(e.message);

					if (testSuiteManager.context.isServer) {
						e.message = chalk.red(e.message);
					}

					throw e;
				}
			};

			if (testSuiteManager.context.isBrowser) {
				describe(testSuiteManager.currentModuleName, function () {
					it(scenarioName, function () {
						testFunction();
					})
				});
			}
			else{
				testFunction();
			}
		}

		return testSuiteManager;
	},
	describe : {
		feature : function (func) {
			testSuiteManager.currentFeatureIdentifier = testSuiteManager.currentModuleName+" - "+_.words(func.name).join(' ').toLowerCase();

			return testSuiteManager;
		}
	},
	currentFeatureIdentifier : '',
	currentModuleName : ''
};

module.exports = testSuiteManager;