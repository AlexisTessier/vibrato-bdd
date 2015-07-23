'use strict';

var i = 0;

var validIdentifier = {
	new : function () {
		i++;

		return 'test-vibrato-bdd-identifier-number-'+i;
	}
};

module.exports = validIdentifier;