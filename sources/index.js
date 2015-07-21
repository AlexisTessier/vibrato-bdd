var contextIsBrowser = (typeof window === 'object' && typeof document === 'object');

/*var context = {
	isBrowser : function (){
		return contextIsBrowser;
	},
	isServer : function () {
		return !contextIsBrowser;
	}
};*/

class VibratoBDD {
	constructor(args) {
	}

	browserTest(){
		console.log('hello browser');
		alert('coconut');
	}

	serverTest(){
		console.log('hello server');
	}
}

export default VibratoBDD;