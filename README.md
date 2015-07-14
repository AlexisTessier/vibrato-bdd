Vibrato BDD
===========

Work in progress...

About
-----

A minimalist Behaviour Driven Development tool to test code both on server and on browser. You can write your specifications and tests, directly in javascript using a fluent API, based on Gherkin syntax.

Why use Vibrato BDD and not some tools like Cucumber ?
-----------------------------------------------------

BDD and the Gherkin syntax are great tools. They allow you to clearly define what you need to test, and they force you to think how your code will work before starting to write it.

But... They also imply that you have to write a plain text description of the behaviour, due to the fact you work with some non-technical profiles. Then you have to rewrite in part the same lines for your tests...

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
	//deepEqual will be accessible in the this object of your step definitions

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

				next(resultOfComparison);
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

Read that page before all :

<a href="http://dannorth.net/introducing-bdd/" target="_blank">Introducing BDD</a>

Vibrato BDD is inspired by <a href="https://cucumber.io" target="_blank">Cucumber</a> and the <a href="https://cucumber.io/docs/reference#gherkin" target="_blank">Gherkin syntax</a>. If you don't know much about Behaviour Driven Development, these links should help you.

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

	Use that property to start the chain for feature description. This object contains a single function named feature.

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

####How to describe a feature

```javascript
//require the VibratoBDD instance
require('vibrato-bdd')('my-project-test-identifier')

.describe.feature('Feature name')
	//returns a function to set a line of text describing the feature
	//You can set many lines in a row
	//Even if you just need at least one line to describe your feature,
	//it can be a good thing to use the pattern : In order, As, I want

	('First line of feature description')
	('Second line of feature description')
	//the function returned to set the next line 
	//has two functions as properties : background and scenario

	.background('Common background for the feature')
		
		.given('a given clause')
		//return a function to set the step definition

			//to set the step definition, you must pass a function named "given_step_definition" as single argument

			(function given_step_definition(next){
				//in step definition, you have access to next function which call the next step definition
				//and in the this, you have access to your resources

				next();
			})

		.and('an other given clause')
			//if one of step definition is not setted, then the test will not pass

	.scenario('A first scenario')

		.given('a given clause')//start the step definition
			(function given_step_definition(next){
				next();
			})


		.but('an other given clause')

		.when('a when clause')
			(function when_step_definition(next){
				
				someAsynchronousFunction(next);
				//you can pass next as a callback to run some asynchronous test
			})

		.then('a then clause')

	.scenario('start describe a other scenario')

	//................................................

		
```
* **background**(***BackgroundName***)

	Start to describe a bakground and returns an object with the given function as property
	A background allow you to defnie common given clauses to all the scenario of you feature. A background must contains at least one given clause.

* **scenario**(***ScenarioName***)

	Start to describe a scenario and returns an object with the given function as property
	You can have multiple scenario for one feature. A scenario must have at least one given clause, one when clause and on than clause.
	
* **given**(***clauseNamme***)
* **when**(***clauseNamme***)
* **then**(***clauseNamme***)

	Start to describe a given, when or then clause.
	Returns a function to set the step definition.
	You also can use the functions and or but to add some clauses.
	Note that if a step defnition is missing, the script will work, but the test will not pass.

* **Outline examples
	at the end of a scenario you can use the functions examples to run the same test with multiples values

	```javascript
	//.................................

	.scenario('counting letters in a word')
		.given('a <word : string>')
			(function given_step_definition(word, next){
				next(word);
			})
		.when('I count the number of letters in it, without counting <excluded letters : string>')
			(function when_step_definition(word, excludedLetters, next){

				var letterCount = countLetters(word, excludedLetters);
				next(letterCount);
			})
		.then('I get <number of letters>')

			(function then_step_definition(letterCount, numberOfLetters){
				assert.strictEqual(letterCount, numberOfletters);
			})
		.examples
			('word', 'excluded letters', 'number of letters')
			('trivial85', '85')
	```
1.	You set the variables names you want in the clause between "<" and ">" (optionnaly you can indicate a valid var type after ":")
2.	Get them
3.	

var type 
data tables 
tag 
hooks
generate docs

in browser

asynchronous test with next
