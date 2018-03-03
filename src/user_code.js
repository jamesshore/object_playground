// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// Functions related to user-entered code.
(function() {
	"use strict";

	var exports = window.jdls.usercode = {};
	var samples = exports.samples = {};

	exports.evaluate = function evaluate(code) {
		/*jshint evil:true, newcap: false */
		var context = {};
		Function(code).call(context);
		return context;
	};

	samples.instructions = { name: "Instructions", code: '// Enter JavaScript code in this box and then click the "Evaluate" button.\n' +
		'// Any variable you assign to "this" will be graphed below.\n' +
		'// Try the presets above for more examples!\n' +
		'\n' +
		'// Example:\n' +
		'this.a = undefined;\n' +
		'this.b = null;\n' +
		'this.c = true;\n' +
		'this.d = "foo";\n' +
		'this.e = 3.14159;\n' +
		'this.f = function bar() {};\n' +
		'this.g = { h: "baz" };\n'
	};

	samples.classical = { name: "Basic Class", code: '// Constructor\n' +
		'function MyClass() {\n' +
		'  this.a = 42;\n' +
		'}\n' +
		'\n' +
		'// Method\n' +
		'MyClass.prototype.method = function method() {};\n' +
		'\n' +
		'// Instantiate\n' +
		'this.instance = new MyClass();\n'
	};

	samples.inheritance = { name: "Classical Inheritance", code: '// Parent class constructor\n' +
		'function Parent() {\n' +
		'  this.a = 42;\n' +
		'}\n' +
		'\n' +
		'// Parent class method\n' +
		'Parent.prototype.method = function method() {};\n' +
		'\n' +
		'// Child class constructor\n' +
		'function Child() {\n' +
		'  Parent.call(this);\n' +
		'  this.b = 3.14159\n' +
		'}\n' +
		'\n' +
		'// Inherit from the parent class\n' +
		'Child.prototype = Object.create(Parent.prototype);\n' +
		'Child.prototype.constructor = Child;\n' +
		'\n' +
		'// Child class method\n' +
		'Child.prototype.method = function method() {\n' +
		'  Parent.prototype.method.call(this);\n' +
		'};\n' +
		'\n' +
		'// Instantiate\n' +
		'this.instance = new Child();\n'
	};

	samples.es6 = { name: "ES6 Inheritance", code: '// This example only works on browsers that support ES6 classes\n' +
		'\n' +
		'// Parent class\n' +
		'class Parent {\n' +
		'\n' +
		'  // Parent class constructor\n' +
		'  constructor() {\n' +
		'    this.a = 42;\n' +
		'  }\n' +
		'\n' +
		'  // Parent class method\n' +
		'  method() {}\n' +
		'\n' +
		'}\n' +
		'\n' +
		'// Child class inherits from Parent\n' +
		'class Child extends Parent {\n' +
		'\n' +
		'  // Child class constructor\n' +
		'  constructor() {\n' +
		'    super();\n' +
		'    this.b = 3.14159;\n' +
		'  }\n' +
		'\n' +
		'  // Child class method\n' +
		'  method() {\n' +
		'    super.method();\n' +
		'  }\n' +
		'\n' +
		'}\n' +
		'\n' +
		'// Instantiate\n' +
		'this.instance = new Child();\n' +
		'\n' +
		'// Run method (check the log)\n' +
		'this.instance.method();\n' +
		'\n'
	};

	samples.inception = { name: "Inception!", code: 'this.jdls = jdls;\n' +
		'\n' +
		'// Can you figure out what the following line does?\n' +
		'// Caution: It\'s commented out because some people have\n' +
		'// reported their browser crashes when this line runs. D\'oh!\n' +
		'\n' +
		'// this.inception = new jdls.ObjectGraph("root", jdls);\n'
	};

	exports.DEFAULT_SAMPLE = samples.instructions;

}());