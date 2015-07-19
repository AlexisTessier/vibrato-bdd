'use strict';

var _ = require('lodash');

var useCov = false;

if (typeof process === "object"){
	if(_.contains(process.argv, '--use-cov')){
		useCov = true;
	}
}

var resources = {
	VibratoBDD : useCov ? require('../lib-cov') : require('../lib'),
	testSuite :  require('./test-suite-manager')
};

module.exports = resources;