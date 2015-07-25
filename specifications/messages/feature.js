'use strict';

var _ = require('lodash');

var feature = {};

feature.error = {
	startingAFeatureWithAUnvalidName : function (bddIdentifier, featureName) {
		return (""+
"You start to describe a feature with an unvalid name in the VibratoBDD instance with identifier \""+bddIdentifier+"\". "+
"A valid name is a non empty string."+
"\""+featureName+"\" isn't a valid valid");
	}

}

module.exports = feature;