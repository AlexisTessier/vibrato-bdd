'use strict';

require('./server-test');

//require('./browser-test');

/*bdd.feature('VibratoObject Pool', function (scenario) {
	scenario('Using add method with one object', function (given, when, then) {

		var VibratoObject = bdd.ressources.VibratoObject;
		given('I got a VibratoObject', function (next) {
			var objectToAdd = new VibratoObject();

			next(objectToAdd);
		})
		.and();

		when('I add this object to the pool', function (objectToAdd, next) {
			VibratoObject.pool.add(objectToAdd);

			next(objectToAdd);
		});

		then('this object is on the pool', function (myAddedObject) {
			var isOnThePool = bdd.assert(myAddedObject).mustBeOnThePool();
		});

	});
});*/