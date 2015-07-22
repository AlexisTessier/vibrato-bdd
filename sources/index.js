var specs = require('../specifications');

function identifierIsValid (identifier) {
	return (typeof identifier === "string" && identifier.length > 0);
}

class VibratoBDD {
  constructor({
  	identifier = null
  }={}) {

  	this.identifier = identifierIsValid(identifier) ? identifier : null;
  }
}

var VibratoBDDPool = {};

function VibratoBDDFactory(identifier){
	if (!identifierIsValid(identifier)) {
		throw new Error(specs.errorMessage.usingTheFactoryWithoutValidIdentifier);
	}
	
	return (VibratoBDDPool[identifier] = new VibratoBDD({identifier}));
}

VibratoBDDFactory.class = VibratoBDD;

export default VibratoBDDFactory;