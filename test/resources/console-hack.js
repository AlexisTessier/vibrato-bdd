'use strict';

var consoleLog = console.log;

console.content = [];

console.cleanContent = function () {
	console.content = [];
};

console.log = function () {
	var args = Array.prototype.slice.call(arguments);
	for(var i=0,imax=args.length;i<imax;i++){
		console.content.push(args[i]);
	}

	consoleLog.apply(console, args);
};

console.contains = function (message) {
	for(var i=0,imax=console.content.length;i<imax;i++){
		var content = console.content[i];

		if (typeof content === "string") {
			if (content.indexOf(message) >= 0) {
				return true;
			}
		}
	}
	return false;
};