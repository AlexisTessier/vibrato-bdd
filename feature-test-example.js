'use strict';

require('vibrato-bdd')('my-project').

describe.feature('VibratoObject Pool')
	
	/*
		In order to access an object even if it was defined in other function
		As a developer
		I Want to save an object and retrieve it later
	*/

	.scenario('Using add method with one <weight>')
		.given('I got a VibratoObject')

			(function step_definition(next) {
				var objectToAdd = new this.VibratoObject();

				next(objectToAdd);
			})

		.when('I add this object to the <identifier>')

			(function step_definition(objectToAdd, next) {
				VibratoObject.pool.add(objectToAdd);

				next(objectToAdd);
			})

		.then('this object is on the pool')
			(function step_definition(myAddedObject) {
				
				about(myAddedObject)
					("It's on the pool")

			})

		.examples	('weight', 'identifier')
					('	8	', '   luke   ')
					('	7	', '   yoda   ')