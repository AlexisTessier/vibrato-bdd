'use strict';

var _ = require('lodash');

var scenarioDoneList = {};

var contextList = ['server', 'browser'];

var testSuiteManager = {
	context : {},
	setContext : function (contextName) {
		for(var i=0, imax=contextList.length; i<imax;i++){
			var possibleContext = contextList[i],
				contextKey = _.camelCase('is-'+possibleContext);

			testSuiteManager.context[contextKey] = (contextName === possibleContext);
		}
	}
};

module.exports = testSuiteManager;