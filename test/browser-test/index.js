'use strict';

var fs = require('fs');
var path = require('path');

var browserify = require('browserify');

var b = browserify();

b.add(path.join(__dirname, './bundle-test.js'));

var writeStream = fs.createWriteStream(path.join(__dirname, 'public/browser-test-bundle.js'));

b.bundle().pipe(writeStream).on('close', function () {
	require('./server').launch();
});