'use strict';

var chalk = require('chalk');

var _success = chalk.green;
var _failure = chalk.red;
var _notice = chalk.cyan;

var log = {
	success : function success (message) {
		console.log(_success(message));
	},
	failure : function failure (message) {
		console.log(_failure(message));
	},
	notice : function notice (message) {
		console.log(_notice(message));
	}
};

module.exports = log;