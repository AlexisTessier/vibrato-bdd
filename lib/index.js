'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

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

var VibratoBDD = (function () {
	function VibratoBDD(args) {
		_classCallCheck(this, VibratoBDD);

		this.test = 'hello';
	}

	_createClass(VibratoBDD, [{
		key: 'testCall',
		value: function testCall() {
			console.log(this.test);
		}
	}, {
		key: 'testError',
		value: function testError() {}
	}]);

	return VibratoBDD;
})();

exports['default'] = VibratoBDD;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map