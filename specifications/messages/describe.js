'use strict';

var _ = require('lodash');

var _describe = {};

_describe.error = {
	startingADescriptionWithAUnvalidName : function (bddIdentifier, descriptionName) {
		return (""+
"You start to describe with an unvalid name in the VibratoBDD instance with identifier \""+bddIdentifier+"\". "+
"A valid name is a non empty string."+
"\""+descriptionName+"\" isn't a valid valid");
	},
	describingAYetDescribedThing : function (bddIdentifier, descriptionName) {
		return (""+
"VibratoBDD instance with identifier \""+bddIdentifier+"\" : "+
"You try to describe \""+descriptionName+"\" but it's yet describe somewhere else.");
	}

}

module.exports = _describe;