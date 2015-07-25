'use strict';

var _ = require('lodash');

var factory = {};

factory.error = {
	usingTheFactoryWithAnUnvalidIdentifier : function (identifier) {
		return (""+
"The VibratoBDD factory needs a string as identifier to instantiate "+
"and save a VibratoBDD object or retrieve a previously saved instance.\n"+
"\""+identifier+"\" isn't a valid identifier");
	}

}

module.exports = factory;