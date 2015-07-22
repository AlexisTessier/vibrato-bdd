"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
var specs = require("../specifications");

function identifierIsValid(identifier) {
	return typeof identifier === "string" && identifier.length > 0;
}

var VibratoBDD = function VibratoBDD() {
	var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	var _ref$identifier = _ref.identifier;
	var identifier = _ref$identifier === undefined ? null : _ref$identifier;

	_classCallCheck(this, VibratoBDD);

	this.identifier = identifierIsValid(identifier) ? identifier : null;
};

var VibratoBDDPool = {};

function VibratoBDDFactory(identifier) {
	if (!identifierIsValid(identifier)) {
		throw new Error(specs.errorMessage.usingTheFactoryWithoutValidIdentifier);
	}

	return VibratoBDDPool[identifier] = new VibratoBDD({ identifier: identifier });
}

VibratoBDDFactory["class"] = VibratoBDD;

exports["default"] = VibratoBDDFactory;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map