'use strict';

var http = require('http');

var connect = require('connect');
var serveStatic = require('serve-static');

var _ = require('lodash');

var server = {};

var socketIO = require('socket.io');

var testSuite = require('../test-suite-manager');

var log = require('../log');

var webdriver = require('selenium-webdriver');

server.launch = function launch (port) {
	var app = connect(),
		usedPort = typeof port === "number" ? port : 3000,
		finalUrl = 'http://localhost:'+usedPort,
		driver;

	if (process.env.SAUCE_USERNAME != undefined) {
      driver = new webdriver.Builder()
      .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
      .withCapabilities({
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        build: process.env.TRAVIS_BUILD_NUMBER,
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        browserName: "firefox"
      }).build();
    } else {
      driver = new webdriver.Builder()
      .withCapabilities({
        browserName: "firefox"
      }).build();
    }

	app.use(serveStatic(__dirname + '/public/'));

	var httpServer = http.createServer(app);

	var io = socketIO(httpServer);

	io.on('connection', function(socket){
		log.success('Browser test started at url : '+finalUrl);

		var testFinished = false;

	  	socket.on('test-disconnect', function(){
	  		if (!testFinished) {
	  			log.failure('Browser test interrupted at url : '+finalUrl);
	  		}
		});

		socket.on('test-finished', function () {
			testFinished = true;
			log.success('Browser test finished at url : '+finalUrl);
			testSuite.exitProcessIfAllTestsAreDone();
		});

		socket.on('test-issue', function (errorMessage) {
			throw Error("Browser error : "+ errorMessage);
		});

		socket.on('test-notice', function (noticeMessage) {
			log.notice("Browser notice : "+ noticeMessage);
		});

		socket.on('error', function (error) {
			throw error;
		});
	});

	httpServer.listen(usedPort);

	log.success('Server for browser test ready at url : '+finalUrl);

	driver.get(finalUrl);

	log.success('Browser opening at url : '+finalUrl);
};

module.exports = server;