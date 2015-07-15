'use strict';

var _ = require('lodash');

require('./server-test');

//if(_.contains(process.argv, "--browser") ){
	require('./browser-test');
//}