'use strict';

var http = require('http');

var connect = require('connect');
var serveStatic = require('serve-static');
var stringColor = require('string-color');

var _ = require('lodash');

var server = {};

var socketIO = require('socket.io');

var testSuite = require('../test-suite-manager');

var log = {
	success : function success (message) {
		console.log(message.color('green'));
	},
	failure : function failure (message) {
		console.log(message.color('red'));
	}
};

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

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
			driver.quit();
			testSuite.exitProcessIfAllTestAreDone();
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

	driver.get(finalUrl);

	log.success('Browser opened at url : '+finalUrl);
};

module.exports = server;