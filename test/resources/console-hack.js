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