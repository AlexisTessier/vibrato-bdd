'use strict';

try{
	require('../test-suite')();
}
catch (e){
	throw new Error("Server error : "+e.message);
}