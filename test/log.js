'use strict';

var stringColor = require('string-color');

var log = {
	success : function success (message) {
		console.log(message.color('green'));
	},
	failure : function failure (message) {
		console.log(message.color('red'));
	},
	notice : function notice (message) {
		console.log(message.color('cyan'));
	}
};

module.exports = log;