'use strict';

var http = require('http');

var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');
var stringColor = require('string-color');

var _ = require('lodash');

var server = {};

var socketIO = require('socket.io');

var log = {
	success : function success (message) {
		console.log(message.color('green'));
	},
	failure : function failure (message) {
		console.log(message.color('red'));
	}
};

server.launch = function launch (port) {
	var app = connect(),
		usedPort = typeof port === "number" ? port : 3000,
		finalUrl = 'http://localhost:'+usedPort;

	app.use(serveStatic(__dirname + '/public/'));

	var httpServer = http.createServer(app);

	var io = socketIO(httpServer);

	io.on('connection', function(socket){
		log.success('Browser test started at url : '+finalUrl);

		var testFinished = false;

	  	socket.on('disconnect', function(){
	  		if (!testFinished) {
	  			log.failure('Browser test interrupted at url : '+finalUrl);
	  		}
		});

		socket.on('finished', function () {
			testFinished = true;
			log.success('Browser test finished at url : '+finalUrl);
			process.exit();
		});

		socket.on('issue', function (message) {
			throw new Error("Browser error : "+message);
		});

		socket.on('error', function (error) {
			throw error;
		});
	});

	httpServer.listen(usedPort);

	log.success('Server for browser test ready at url : '+finalUrl);

	console.log(process.platform);

	open(finalUrl);

	log.success('Browser opened at url : '+finalUrl);
};

module.exports = server;