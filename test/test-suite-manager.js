'use strict';

var _ = require('lodash');

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
							console.log('Error catched because test need context '+(_.kebabCase(currentContextKey).split('-')[1]));
						}
					}
				};
				return func;
			})(contextKey);
		}
	},
	scenario : function scenario(moduleName, scenarioName, scenarioTest){
		if (testSuiteManager.context.isBrowser) {
			describe(moduleName, function () {
				it(scenarioName, function () {
					scenarioTest();
				})
			});
		}
		else{
			scenarioTest();
		}

		return scenarioName;
	}
};

module.exports = testSuiteManager;