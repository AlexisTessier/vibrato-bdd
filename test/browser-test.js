'use strict';

describe('VibratoBDD', function () {
	it('must work in a browser', function () {
		try{
			require('./test-suite')('browser');
		}
		catch (e){
			e.message = "Browser error : "+e.message;
			
			throw e;
		}
	})
});