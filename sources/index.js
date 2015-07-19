var contextIsBrowser = (typeof window === 'object' && typeof document === 'object');

var context = {
	isBrowser : function (){
		return contextIsBrowser;
	},
	isServer : function () {
		return !contextIsBrowser;
	}
};

class VibratoBDD {
	constructor(args) {
		this.test = "hello";
	}

	testCall(){
		console.log(this.test);
	}

	testError(){
	}
}

export default VibratoBDD;