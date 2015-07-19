'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
	value: true
});
var contextIsBrowser = typeof window === 'object' && typeof document === 'object';

var context = {
	isBrowser: function isBrowser() {
		return contextIsBrowser;
	},
	isServer: function isServer() {
		return !contextIsBrowser;
	}
};

var VibratoBDD = function VibratoBDD(args) {
	_classCallCheck(this, VibratoBDD);
};

exports['default'] = VibratoBDD;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map