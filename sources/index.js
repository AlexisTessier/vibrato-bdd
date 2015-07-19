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
	}
}

export default VibratoBDD;