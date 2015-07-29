'use strict';

var _ = require('lodash');

var _it = {};

_it.error = {
	usingItWithAUnvalidName : function (bddIdentifier, unvalidName) {
		return (""+
"You start to describe something using the it function with an unvalid name in the VibratoBDD instance with identifier \""+bddIdentifier+"\". "+
"A valid name is a non empty string."+
"\""+featureName+"\" isn't a valid valid");
	}

}

module.exports = _it;