Vibrato BDD
===========

![Project Status : deprecated](https://img.shields.io/badge/Project%20Status-deprecated-red.svg)

**This module is currently deprecated. Never progressed to do it because no time/motivation then I discover [AVA](https://www.npmjs.com/package/ava).**

About
-----

A Behaviour Driven Development framework. Use it to write your specifications and tests directly in javascript using a fluent API, based on Gherkin syntax.

Why use Vibrato BDD ?
---------------------

BDD and the Gherkin syntax are great tools. They allow you to clearly define what you need to test, and they force you to think how your code will work before starting to write it.

But... They also imply that you have to write a plain text description of the behaviour, due to the fact you work with some non-technical profiles. Then you have to rewrite in part the same lines for your tests...

***For developers*** who want to take advantages of BDD, Vibrato BDD can avoid the duplicate content and the extra step in test process that represents a plain text behaviour description.

Install
-------

	npm install vibrato-bdd

How to use
----------

1.	First, **create a "test" directory** at root of your project

2.	then, **write your features scenario** in distinct files in a "test-suite" directory for example (but organize them as you want)

	```javascript
	/* my-project/test/test-suite/my-feature-test.js */

	.describe.feature("Deep equal function")(
		"In order to know if two objects are identical",
		"As a developer",
		"I Want to deeply compare these two ojects"
	)

	.scenario("Comparing two identical objects")

		.given("I've got two objects which are the sames")
		.when("I use the deepEqual function")
		.then("it returns a true value")
	```

3.	add a file index.js in the "test" directory, to **initialize your resources** and the tests you want to run

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('My framework')
	//create an instance of vibrato-bdd with an identifier

	.setResource('deepEqual', require('my-deep-equal-function'))
	//deepEqual will be accessible in the this object of your step definitions

	.buildTestSuite(function(){
		require('./test-suite/my-feature-test');
	})
	//Choose the features tests you want to test, using a require

	.runTestSuite();
	//then just launch your test suite
	```

4. go back to your feature test file and **write your step definitions**

	```javascript
	/* my-project/test/test-suite/my-feature-test.js */

	//import your favorite assertion module
	var assert = require('assert');

	//add this line to retrieve your vibrato-bdd instance
	require('vibrato-bdd')('My framework')

	.describe.feature("Deep equal function")(
		"In order to know if two objects are identical",
		"As a developer",
		"I Want to deeply compare these two ojects"
	)

	.scenario("Comparing two identical objects")

		.given("I got two objects which are the sames")

			//write your step definition directly here
			(function given_step_definition(next) {
				var objectOne = {name : "luke", mother : {name : "padme"}},
					objectTwo = {name : "luke", mother : {name : "padme"}};

				next(objectOne, ObjectTwo);
				//you can pass value througt the steps with the next callback
			})	

		.when("I use the deepEqual function")

			(function when_step_definition(objectOne, objectTwo, next) {
				var resultOfComparison = this.deepEqual(objectOne, objectTwo)
				//you can access to your resources througt the this context

				next(resultOfComparison);
			})	

		.then("it returns a true value")

			(function when_step_definition(result, end) {
				
				assert.strictEqual(result, true);

				end();
				//same callback as next
				//but named differently to mark the end of current scenario
			})	
	```

5. run the following basic command to **launch the test suite**:

	```	
	node test
	```

Documentation
-------------

[See the wiki](https://github.com/AlexisTessier/vibrato-bdd/wiki)

* [Class and factory](https://github.com/AlexisTessier/vibrato-bdd/wiki/Class-and-factory)
* [Methods and properties](https://github.com/AlexisTessier/vibrato-bdd/wiki/Methods-and-properties)
* [Description API](https://github.com/AlexisTessier/vibrato-bdd/wiki/Description-API)
* [Tags](https://github.com/AlexisTessier/vibrato-bdd/wiki/Tags)
* [Test status](https://github.com/AlexisTessier/vibrato-bdd/wiki/Test-status)
* [Command line usage](https://github.com/AlexisTessier/vibrato-bdd/wiki/Command-line-usage)