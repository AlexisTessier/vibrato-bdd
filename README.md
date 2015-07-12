Vibrato BDD
===========

Work in progress...

About
-----

A minimalist Behaviour Driven Development tool to test code both on server and on browser. You can write your tests mixed with your features descriptions, directly in javascript using a fluent API, based on Gherkin syntax.

Why use Vibrato BDD and not some tools like Cucumber ?
-----------------------------------------------------

BDD and the Gherkin syntax are great tools. They allow you to clearly define what you need to test, identify some misconceptions problem as soon as possible, and they have many other qualities.

But... They also imply that you have to write a plain text description of the behaviour, due to the fact you work with some non-technical profiles. Then rewrite in part the same lines for your tests...

***For developers*** who want to take advantages of BDD, Vibrato BDD can avoid the duplicate content and the extra step in test process that represents a plain text behaviour description.

Install
-------

	npm install vibrato-bdd

How to use
----------

1.	First, **create a "test" directory** at root of your project

2.	then, **add in it, a "test-suite" folder** where you will **write your features tests** in distinct files (organize them as you want)

	```javascript
	/* my-project/test/test-suite/my-feature-test.js */

	.describe.feature('Deep equal function')
		
		('In order to know if two objects are identical')
		('As a developer')
		('I Want to deeply compare these two ojects')

	.scenario('Comparing two identical objects')

		.given("I've got two objects which are the sames")
		.when('I use the deepEqual function')
		.then('it returns a true value')
	```

3.	add a file index.js in the "test" directory, to **initialize your resources** and the tests you want to run

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')
	//create an instance of vibrato-bdd with an identifier

	.addResource('deepEqual', require('my-deep-equal-function'))
	//deepEqual will be accesible in the this object of your step definitions

	.runTestSuiteFrom(__dirname);
	//then just run the test suite
	```

4. go back to your feature test file and **write your step definitions**

	```javascript
	/* my-project/test/test-suite/my-feature-test.js */

	//import your favorite assertion module
	var assert = require('assert');

	//add this line to import your vibrato-bdd instance
	require('vibrato-bdd')('my-project-test-identifier')

	//note how the fluent chaining syntax allows you to write human readable test

	.describe.feature('Deep equal function')
		
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
				//you can access to your resources througt the this context

				next(objectOne, ObjectTwo);
			})	

		.then('it returns a true value')

			(function when_step_definition(result) {
				
				assert.strictEqual(result, true);
			})	
	```

5. run the following basic command to **launch the test suite**:

	```	
	node test
	```

Reference
---------

Vibrato BDD is inspired by <a href="https://cucumber.io" target="_blank">Cucumber</a> and the <a href="https://cucumber.io/docs/reference#gherkin" target="_blank">Gherkin syntax</a>.

Read that page before all :

<a href="http://dannorth.net/introducing-bdd/" target="_blank">Introducing BDD</a>

Documentation
-------------

####VibratoBDD class
You can access the class and instantiate a custom VibratoBDD object like this :
```javascript
var VibratoBDD = require('vibrato-bdd').class;

var bdd = new VibratoBDD({identifier : 'my-instance-of-vibrato-bdd'});
```

####require('vibrato-bdd')
returns a function taking a identifier string as single parameter. That function return an instance of VibratoBDD with the identifier, and save it so you can access later in other modules. If an instance with the identifier is yet saved, the function return it.

####VibratoBDD methods and properties

* **describe**

	use to start the chain for feature description. This object contains a single function named feature.

* **addResource**(***resourceName***, ***resource***)

	save ***resource*** and set them as a property of your step definitions. Note if you just indicate the resource as a single parameter, the ***resourceName*** is setted by default with the constructor/class name of your resource (if possible).

* **excludeTest**(***testToExclude***)

	***testToExclude*** must be string or an array of string. All the features test contained in the file or directory targeted by the path ***testToExclude*** will not be executed. The path is relative to the "test-suite" directory

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')

	.excludeTest('some-group-of-test/an-object-features')
	//all the test in "my-project/test/test-suite/some-group-of-test/an-object-features will be ignored
	```

* **runTestSuiteFrom**(***testDirectoryPath***)
	
	this method launch all the javascript files in the "test-suite" directory (unless they were excluded), then run the test.


asynchronous test with next
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