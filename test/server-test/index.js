'use strict';

require('source-map-support').install();

try{
	require('../test-suite')();
}
catch (e){
	e.message = "Server error : "+e.message;
	throw e;
}