'use strict';

function errorWithMessage (message) {
	return function (err) {
		return (err.message.indexOf(message) >= 0 && err.message.length === message.length);
	}
}

module.exports = errorWithMessage;