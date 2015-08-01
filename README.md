[![Coverage Status](https://coveralls.io/repos/AlexisTessier/vibrato-bdd/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexisTessier/vibrato-bdd?branch=master)
[![Build Status](https://travis-ci.org/AlexisTessier/vibrato-bdd.svg?branch=master)](https://travis-ci.org/AlexisTessier/vibrato-bdd)

Vibrato BDD
===========

Work in progress...

The module has not been written yet.

I use a README as a guideline to write my specs.

About
-----

A Behaviour Driven Development framework. You can write your specifications and tests directly in javascript using a fluent API, based on Gherkin syntax.

It works fine with Karma test runner and istanbul.

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

2.	then, **write your features tests** in distinct files in a "test-suite" directory for example (but organize them as you want)

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

	require('vibrato-bdd')('my-project-test-identifier')
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

	//add this line to import your vibrato-bdd instance
	require('vibrato-bdd')('my-project-test-identifier')

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

* Description API
* Class and factory
* Methods and properties
* Tags
* Command line options

Vibrato description API

####VibratoBDD class
You can access the class and instantiate a custom VibratoBDD object like this :
```javascript
var VibratoBDD = require('vibrato-bdd').class;

var bdd = new VibratoBDD({identifier : 'my-instance-of-vibrato-bdd'});
```

####require('vibrato-bdd')
returns a function taking a identifier string as single parameter. That function return an instance of VibratoBDD with the identifier, and save it so you can access later in other modules. If an instance with the identifier is yet saved, the function return it.

####VibratoBDD methods and properties

* **describe**, **describe**(***topicName***)

	Use that property to start the chain for feature description. This object contains a single function named feature which create a feature function and add it in the **features** property of current VibratoBDD instance (see next). Eventually use describe as a function to start a simple test description (see later).

* **features**

	An object containing many Arrays :

	* **features.all**
		All the features tests in your test suite
	* **features.started**
		The features tests actually launched
	* **features.running**
		The features tests currently running
	* **features.passed**
		The features tests ended without error
	* **features.failed**
		The features tests ended with error

	The structure of the features objects listed in these Array is the following :

	* **name**
		A string containing the name of the feature
	* **description**
		A string containing the description of the feature
	* **background**
		An Array containing all the given clauses in the feature background. A given clause is an object with the following keys :
		* *description* (the description string of the clause)
		* *stepDefinition* (the step definition function)

	* **scenarioList**
		An Array containing all the scenarios of the feature
	* **block**
		The function which will be called to run the test
	* **state**
		A string containing the state of the test ("in the suite", "running", "passed", "failed", "ignored")

* **descriptions**
	
	An object containing many Arrays :

	* **descriptions.all**
		All the simple descriptions tests in your test suite
	* **descriptions.started**
		The simple descriptions tests actually launched
	* **descriptions.running**
		The simple descriptions tests currently running
	* **descriptions.passed**
		The simple descriptions tests ended without error
	* **descriptions.failed**
		The simple descriptions tests ended with error

	The structure of the descriptions objects listed in these Array is the following :

	* **name**
		A string containing the name of the described thing
	* **specifications**
		A Array containing all the "it" clauses about the described thing
	* **block**
		The function which will be called to run the test
	* **state**
		A string containing the state of the test ("in the suite", "running", "passed", "failed")

* **testSuite**
	
	An object which contains both features tests and simple descriptions tests. It's an object like properties "features" and "descriptions" with keys "all", "started", "running", "passed" and "failed" Arrays. Each of these Array contains an object with the following structure :

	* **type**
		A string containing "feature" or "description" according to the type of test
	* **test**
		The test object with the structure above depending of it's a feature or simple description


* **setResource**(***resourceName***, ***resource***)

	save ***resource*** and set it as a property of your step definitions. Note if you just indicate the resource as a single parameter, the ***resourceName*** is setted by default with the constructor name of your resource if it's a class or with the name if it's a function.

	By default, one resource named context is already setted (see later).

* **excludeFeature**(***featureToExclude***)

	***featureToExclude*** must be a string or an array of string. All the features with their name in ***featureToExclude*** will not be executed.

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')

	.excludeFeature("an-object-feature")
	//Now, even if it's required in the buildTestSuite latter, the feature named "an-object-feature" will be ignored
	```

* **excludeTag**(***tagListToExclude***)

	***tagListToExclude*** must be a string. All the scenarios with a related tag matching one of those in ***tagListToExclude*** will not be executed.

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')

	.excludeTag('tagOne tagTwo otherTag')
	```

* **setContextList**(***contextList***)
	***contextList*** must be an Array of string. Each string is the name of one possible context for your tests.

	```javascript
	//........................

	.setContextList(['server', 'browser'])
	```

	Then, in your "context" resource, your have an access to two methods for each possible context :

	* **is[camel cased context name]**()  
		Return true if the context is activated

		```javascript
		//In a feature description
		//........................

		.scenario("Some scenario")
			.given("given clause")

				(function given_step_definition(next){

					if(this.context.isBrowser()){
						doSomethingWith(window);
					}

					next();
				})
		```

	* **need[camel cased context name]**(***block***)
		Executes the ***block*** function, but if the context isn't activated, errors will be catched and ignored. For better code coverage, you should use this function in place of the "is" method.

		```javascript
		//In a feature description
		//........................

		.scenario("Some scenario")
			.given("given clause")

				(function given_step_definition(next){

					this.context.needBrowser(function(){
						doSomethingWith(window);
					});

					next();
				})
		```

	You can know if neither context is activated, using the context method :

	* **no**()  
		Return true if neither context is activated

* **useContext**(***contextName***)
	
	This method allows you to active a specific context to run the test suite.

	See In Browser Testing for examples.

* **buildTestSuite**(***requireTestSuiteFunction***)

	***requireTestSuiteFunction*** must be a function. In it you have to require all your files containing features descriptions.

* **runTestSuite**(***requireTestSuiteFunction*** [***tagList***])
	
	If ***tagList*** is a string, only the scenarios with a related tag matching one of those in ***tagList*** will be launched (Unless they were previously excluded), else it runs all your scenarios.

* **TagList parameter**
	
	A tag list is a string containing the targeted tags, separated by spaces.  
	In order to achieve a finest targeting, you can also use a combination of parenthesis and "&" character in place of space to indicate that multiples tags are required to run or exclude the related scenarios.

	Spaces means "OR" and are less priority.

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')

	.runTestSuite('animal & bunny cat')
	//run the scenario related to ("animal" and "bunny"), or ("cat")

	.runTestSuite('(animal & bunny) cat')
	//run the scenario related to ("animal" and "bunny"), or ("cat")

	.runTestSuite('animal & (bunny cat)')
	//run the scenario related to ("animal" and "bunny"), or ("animal" and "cat")

	.runTestSuite('animal & bunny (painting & human & (animal & cat book & (dragon unicorn)))')
	//run the scenario related to ("animal" and "bunny"),
	//or ("painting" and "human" and "animal" and "cat"), 
	//or ("painting" and "human" and "book" and "dragon"),
	//or ("painting" and "human" and "book" and "unicorn")
	//but i mean, avoid these complex filterings, it's unreadable...
	```

#####More

* **tag**(***tagNameList***)
	
	Tags allow you to group scenarios. You can set one or many tags on features, scenario or examples (one line or all).

	```javascript
	require('vibrato-bdd')('my-project-identifier')

	.describe.feature("Feature name").tag('TagOne TagTwo') //tag a feature

		("feature description")

		.scenario("Scenario name").tag('TagThree') //tag a scenario

			.given("...")
			.when("...")
			.then("...")

			.examples.tag('...') //tag all these examples
				('fieldOne', 'fieldTwo')
				/*--------------------*/
				("...",       "..."    ).tag('poney')//tag this single example
				("...",       "..."    ).tag('dog')
				("...",       "..."    ).tag('cat')
	```

	Then, you can choose to run this scenario just for the tag "poney" or "cat" for example, in your test/index.js file :

	```javascript
	require('vibrato-bdd')('my-project-identifier')

	.runTestSuite('poney cat');
	```

	or another one from the cli, when using the command "node test", with the --vibrato-tag (-vt) option :

		node test -vt poney dog

#####Command line options

* ***--vibrato-tag (-vt)***
	Only scenarios related to at least one tag matching one of those listed in the option will be launched.

* ***--vibrato-tag-excluded (-vte)***
	Scenarios related to at least one tag matching one of those listed in the option will be ignored.

* ***--vibrato-context (-vc)***
	Active all the contexts listed for running the test suite

* ***--vibrato-exclude (-ve)***
	All the features with their name listed will not be executed.

#####In Browser testing

#####Using with Karma test runner

#####Using with Karma + Istanbul + Travis + Coveralls

#####Next steps
	Feature change detect
	create and update test from .feature files  
	create and update .feature files from test  
	Maybe hooks