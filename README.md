[![Coverage Status](https://coveralls.io/repos/AlexisTessier/vibrato-bdd/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexisTessier/vibrato-bdd?branch=master)
[![Build Status](https://travis-ci.org/AlexisTessier/vibrato-bdd.svg?branch=master)](https://travis-ci.org/AlexisTessier/vibrato-bdd)

Vibrato BDD
===========

Work in progress...

The module has not been written yet.

I use a README as a guideline to write my specs.

About
-----

A minimalist Behaviour Driven Development framework. You can write your specifications and tests directly in javascript using a fluent API, based on Gherkin syntax.

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

2.	then, **add in it, a "test-suite" folder** where you will **write your features tests** in distinct files (organize them as you want)

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

Reference
---------

Read that page before all :

<a href="http://dannorth.net/introducing-bdd/" target="_blank">Introducing BDD</a>

Vibrato BDD is inspired by <a href="https://cucumber.io" target="_blank">Cucumber</a> and mostly the <a href="https://cucumber.io/docs/reference#gherkin" target="_blank">Gherkin syntax</a>. If you don't know much about Behaviour Driven Development, these links should help you.

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

* **setResource**(***resourceName***, ***resource***)

	save ***resource*** and set them as a property of your step definitions. Note if you just indicate the resource as a single parameter, the ***resourceName*** is setted by default with the constructor/class name of your resource (if possible).

* **excludeTest**(***testToExclude***)

	***testToExclude*** must be a string or an array of string. All the features test contained in the file or directory targeted by the path ***testToExclude*** will not be executed. The path is relative to the "test-suite" directory

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')

	.excludeTest("some-group-of-test/an-object-features")
	//all the tests in "my-project/test/test-suite/some-group-of-test/an-object-features" will be ignored
	```

* **excludeTag**(***tagListToExclude***)

	***tagListToExclude*** must be a string. All the scenarios with a related tag matching one of those in ***tagListToExclude*** will not be executed.

	```javascript
	/* my-project/test/index.js */

	require('vibrato-bdd')('my-project-test-identifier')

	.excludeTag('tagOne tagTwo otherTag')
	```

* **runTestSuiteFrom**(***testDirectoryPath*** [, ***tagList***])
	
	This method launch all the javascript files in the "test-suite" directory (unless they were excluded), then run the test. If ***tagList*** is a string, only the scenarios with a related tag matching one of those in ***tagList*** will be launched (Unless they were previously excluded).

####How to describe a feature

```javascript
//require the VibratoBDD instance
require('vibrato-bdd')('my-project-test-identifier')

.describe.feature("Feature name")(
	//feature returns a function to set lines of text describing the feature
	//You can set many lines in a row
	//Even if you just need at least one line to describe your feature,
	//it can be a good thing to use the pattern : In order, As, I want

	"First line of feature description",
	"Second line of feature description"
	)
	//the returned object has two functions as properties
	//background and scenario

	.background("Common background for the feature")
		
		.given("a given clause")
		//return a function to set the step definition

			//to set the step definition, you must pass a function
			//named "given_step_definition" as single argument

			(function given_step_definition(next){
				//in step definition, you have access to next function
				//next() call the following step definition

				next();
			})

		.and("an other given clause")
			//if one of step definition is not setted,
			//then the test will not pass

	.scenario("A first scenario")

		.given("a given clause")//start the step definition
			(function given_step_definition(next){
				next();
			})


		.but("an other given clause")

		.when("a when clause")
			(function when_step_definition(next){
				
				someAsynchronousFunction(next);
				//you can pass next as a callback
				//to run some asynchronous test
			})

		.then("a then clause")

	.scenario("start describe a other scenario")

	//................................................

		
```
* **background**(***BackgroundName***)

	Start to describe a bakground and returns an object with the given function as property. A background allow you to define common given clauses for all the scenario of you feature. A background must contains at least one given clause.

* **scenario**(***ScenarioName***)

	Start to describe a scenario and returns an object with the given function as property
	You can have multiple scenario for one feature. A scenario must have at least one "given" clause, one "when" clause and one "then" clause (in this order).
	
* **given**(***clauseName***)
* **when**(***clauseName***)
* **then**(***clauseName***)

	Start to describe a given, a when or a then clause.
	
	Returns a function to set the step definition.
	You also can use the functions and or but to add some clauses.
	
	Note that if a step defnition is missing, the script will work, but the test will not pass. That allow you to write first your specs without implementing the tests.
	
	After a then, you can start a new scenario...

#####Outline examples

At the end of a scenario you can use the functions examples to run the same test with multiples values

* **examples**(***firstVarName***, ***[othersVarName...]***)

	Set the variables names accessibles in the description and returns a function to set values of each variable for one example.

	```javascript
	//.................................

	.scenario("counting letters in a word")
		.given("a <list of ignored letters> i should ignore")
			(function given_step_definition(listOfIgnoredLetters, next){

				var excludedLetters = listOfIgnoredLetters.split('');

				next(excludedLetters);
			})

		.when("I count the number of letters in a <word>")
			(function when_step_definition(excludedLetters, word, next){

				var letterCount = countLetters(word, excludedLetters);

				next(letterCount);
			})
		.then("I get <number of letters>")

			(function then_step_definition(letterCount, numberOfLetters){

				assert.strictEqual(letterCount, numberOfletters);
			})

		.examples
			('list of ignored letters', 'word',      'number of letters')
			/*---------------------------------------------------------*/
			("aeiouy",                  "consonant",          6         )//first example
			("bcdfghjklmnpqrstvwxz",    "vowel",              2         )//second example
	```


1.	You set the variables names you want in the clause between "<" and ">"
2.	Set them using the examples function. This function take as parameters the list of variable name and returns a function to set a example. You can set much example you want.
3.	For each example, the variables present in the step description will be passed before the next callback. They are passed in there order of apparence in the description. Note that if you pass parameters to the next callback, they will be passed before the examples variables in the following step definition.

#####Data as step arguments

In addition to the examples function, you have three others ways to set datas in your step definitions.

* **Directly in the given, when and then clauses**
	
	```javascript
	//.................................

	.given("I am <age : 52> years old")
		
		(function given_step_definition(age, next){
			var user = new User({age : age});

			next(user);
		})

	.but("My name is <name : Peter Pan>")

		(function given_step_definition(user, name, next){
			user.name = name;
			
			next(user);
		})

	.when("I'am going to the Neverland")
	.then("I'am still a kid")
	```

	It works just like examples, but you have to set the value after a colon. Note that in this example, age will be automically setted as a number.

* **text**

	Eventually you could want to specify a larger piece of text. In this case you can use the function returned by given(), when(), then(), and() or but() to set lines of the text. This text will be passed just before the next callback in the step definition.

	It's the equivalent of Gherkin Syntax's Docs String. If you use es6, a template string is probably better way to achieve multilines strings.

	```javascript
	//.................................

	.given("A article with the following heading :")(
		"Oh really, now i have to find an example for this fictional heading...",
		"I've got seriously no fucking idea here right now...",
		"One day, i wanna go to swimming with pandas !!!",
		"Urf...",
		"Sorry, it's the only thought that came to me."
	)

		(function given_step_definition(heading, next){
			//heading is the concatenation of all the lines setted above
			next();
		})
	//.................................
	```

* **table**

	If you want to specify a larger piece of data you can use the function returned by given(), when(), then(), and() or but() to set them. It works like the examples function. First function call is to set the fields names, them each line represents an entry. The datas will be passed just before the next callback in the step definition as an Array of objects.

	Note that if you don't indicate any entry, the fields names will be treated as lines of a text.

	It's the equivalent of Gherkin Syntax's Data Tables.

	```javascript
	//.................................

	.given("The following animals exist :")
		('name',    'origin', 'cuteness level')
		/*-----------------------------------*/
		("griffin", "Egypt",          0       )
		("unicorn", "rainbows",       4       )
		("cat",     "cat trees",     9999     )


		(function given_step_definition(animals, next){
			var world = new this.World();

			for(var i=0, imax=animals.length, animal; i<imax; i++){
				animal=animals[i];
				world.animals[animal.name] = animal;
			}
		
			next(world);
		})
	//.................................
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

	.runTestSuiteFrom(__dirname, 'poney cat');
	```

	or another one from the cli, when using the command "node test", with the --vibrato-tag (-vt) option :

		node test -vt poney dog

#####Command line options

* ***--vibrato-tag (-vt)***
	Only scenarios related to at least one tag matching one of those listed in the option will be launched.

* ***--vibrato-tag-excluded (-vte)***
	Scenarios related to at least one tag matching one of those listed in the option will be ignored.

* ***--vibrato-exclude (-ve)***
	All the features test contained in the file or directory targeted by one of path listed will not be executed. The pat hare relative to the "test-suite" directory

#####In Browser testing

#####Using with Karma test runner

#####Using with Karma + Istanbul + Travis + Coveralls

#####Next steps
	Feature change detect
	create and update test from .feature files  
	create and update .feature files from test  
	Maybe hooks