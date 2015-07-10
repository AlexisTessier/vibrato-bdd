Vibrato BDD
===========

Work in progress...

About
-----

A minimalist Behaviour Driven Development tool to test code both on server and on browser. The structure of tests is inspired by the Gherkin Syntax, but writable directly in javascript. ***For developers projects***, it can avoid to add the duplicate content and extra step in test process that represents a plain text behaviour description. Like i said, it's ***for developers projects***...

Install
-------

	npm install vibrato-bdd

How to use
----------

1.	First, **create a "test" directory** at root of your project

2.	then, **add in it a "test-suite" folder** where you **write your features test** in distincts files (organize them as you want)

	```javascript
	/* my-project/test/test-suite/my-feature-test.js */

	describe.feature('Deep equal function')
		
		('In order to know if two objects are identical')
		('As a developer')
		('I Want to deeply compare these two ojects')

	.scenario('Comparing two identical objects')

		.given('I got two objects which are the sames')
		.when('I use the deepEqual function')
		.then('it returns a true value')
	```

3.	add a file index.js in the "test" directory, an use it to **initialize your ressources** and test suites you want to run

	```javascript
	/* my-project/test/index.js */

	//end your lines with the chained syntax dot

	require('vibrato-bdd')('my-project-test-identifier').
	//create an instance of vibrato-bdd with an identifier

	addRessource('deepEqual', require('my-deep-equal-function')).
	//deepEqual will be accesible in the this context of your step definitions

	runTestSuiteFrom(__dirname);
	//then just run the test suite
	```

4. go back to your feature test file and **write your step definitions**

	```javascript
	/* my-project/test/test-suite/my-feature-test.js */

	//import your favorite assertion module
	var assert = require('assert');

	//add this line to import your vibrato-bdd instance
	require('vibrato-bdd')('my-project-test-identifier').

	describe.feature('Deep equal function')
		
		('In order to know if two objects are identical')
		('As a developer')
		('I Want to deeply compare these two ojects')

	.scenario('Comparing two identical objects')

		.given('I got two objects which are the sames')

			//write your step definition directly here
			(function given_step_definition(next) {
				var objectOne = {name : "luke", mother : {name : "padme"}},
					objectTwo = {name : "luke", mother : {name : "padme"}};

				next(objectOne, ObjectTwo);
				//you can pass value througt the steps with the next callback
			})	

		.when('I use the deepEqual function')

			(function when_step_definition(objectOne, objectTwo, next) {
				var resultOfComparison = this.deepEqual(objectOne, objectTwo)
				//you can access to your ressources througt the this context

				next(objectOne, ObjectTwo);
			})	

		.then('it returns a true value')

			(function when_step_definition(result) {
				
				assert.strictEqual(result, true);
			})	
	```

5. run the following basic command to **launch the test**:

	```	
	node test
	```

Documentation
-------------
gherkin syntax cucumber ref 
all the refs 
ressources autonaming 
asynchronous test with next
test exclude 
undefined step 
multiple scenario 
and, but 
background 
outline examples 
var type 
data tables 
tag 
hooks
generate docs
in browser