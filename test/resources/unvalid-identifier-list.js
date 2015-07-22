'use strict';

var unvalidIdentifierList = [
	null,
	undefined,
	/rgex/,
	8,
	8.2,
	function () {},
	{},
	[],
	""
];

module.exports = unvalidIdentifierList;