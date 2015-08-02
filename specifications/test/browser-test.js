'use strict';

try{
	require('./test-suite')('browser');
}
catch (e){
	e.message = "Browser error : "+e.message;
			
	throw e;
};