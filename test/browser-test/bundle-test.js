'use strict';

var bundleTest = require('../test-suite');

function closeWindow (delay) {
	window.setTimeout(function () {
		window.close();
	}, (typeof delay === 'number' ? delay : 0));
}

document.addEventListener("DOMContentLoaded", function(event) { 
	try{
		bundleTest();
	}
	catch(e){
		socket.emit('issue', e.message);

		closeWindow(2500);
	}

	socket.emit('finished');
	closeWindow(2500);
});