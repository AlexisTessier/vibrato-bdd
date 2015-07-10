"use strict";
var contextIsBrowser = (typeof window === 'object' && typeof document === 'object');
var context = {
  isBrowser: function() {
    return contextIsBrowser;
  },
  isServer: function() {
    return !contextIsBrowser;
  }
};
var VibratoBDD = function() {
  function VibratoBDD(args) {}
  return ($traceurRuntime.createClass)(VibratoBDD, {}, {});
}();
var $__default = VibratoBDD;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
