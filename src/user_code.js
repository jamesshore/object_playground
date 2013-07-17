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

	samples.classical = { name: "Basic Class", code: 'function MyClass() {}\n' +
		'MyClass.prototype.method = function method() {};\n' +
		'this.instance = new MyClass();'
	};

	samples.inheritance = { name: "Classical Inheritance", code: 'function Parent() {}\n' +
		'Parent.prototype.method = function method() {};\n' +
		'\n' +
		'function Child() {\n' +
		'  Parent.call(this);\n' +
		'}\n' +
		'Child.prototype = Object.create(Parent.prototype);\n' +
		'Child.prototype.constructor = Child;\n' +
		'Child.prototype.method = function method() {\n' +
		'  Parent.prototype.method.call(this);\n' +
		'};\n' +
		'\n' +
		'this.instance = new Child();'
	};

	samples.resig = { name: "John Resig’s Inheritance",
		code: '// This example contributed by Dave Woldrich -- thanks!\n' +
		'\n' +
		'/* Simple JavaScript Inheritance\n' +
		' * By John Resig http://ejohn.org/\n' +
		' * MIT Licensed.\n' +
		' */\n' +
		'// Inspired by base2 and Prototype\n' +
		'(function(){\n' +
		'  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\\b_super\\b/ : /.*/;     \n' +
		'  // The base Class implementation (does nothing)\n' +
		'  this.Class = function(){};\n' +
		' \n' +
		'  // Create a new Class that inherits from this class\n' +
		'  Class.extend = function(prop) {\n' +
		'    var _super = this.prototype;\n' +
		'   \n' +
		'    // Instantiate a base class (but only create the instance,\n' +
		'    // don\'t run the init constructor)\n' +
		'    initializing = true;\n' +
		'    var prototype = new this();\n' +
		'    initializing = false;       \n' +
		'    // Copy the properties over onto the new prototype\n' +
		'    for (var name in prop) {\n' +
		'      // Check if we\'re overwriting an existing function\n' +
		'      prototype[name] = typeof prop[name] == "function" &&\n' +
		'        typeof _super[name] == "function" && fnTest.test(prop[name]) ?\n' +
		'        (function(name, fn){\n' +
		'          return function() {\n' +
		'            var tmp = this._super;               \n' +
		'            // Add a new ._super() method that is the same method\n' +
		'            // but on the super-class\n' +
		'            this._super = _super[name];               \n' +
		'            // The method only need to be bound temporarily, so we\n' +
		'            // remove it when we\'re done executing\n' +
		'            var ret = fn.apply(this, arguments);        \n' +
		'            this._super = tmp;\n' +
		'           \n' +
		'            return ret;\n' +
		'          };\n' +
		'        })(name, prop[name]) :\n' +
		'        prop[name];\n' +
		'    }       \n' +
		'\n' +
		'    // The dummy class constructor\n' +
		'    function Class() {\n' +
		'      // All construction is actually done in the init method\n' +
		'      if ( !initializing && this.init )\n' +
		'        this.init.apply(this, arguments);\n' +
		'    }       \n' +
		'\n' +
		'    // Populate our constructed prototype object\n' +
		'    Class.prototype = prototype;       \n' +
		'\n' +
		'    // Enforce the constructor to be what we expect\n' +
		'    Class.prototype.constructor = Class;\n' +
		' \n' +
		'    // And make this class extendable\n' +
		'    Class.extend = arguments.callee;       \n' +
		'\n' +
		'    return Class;\n' +
		'  };\n' +
		'})();\n' +
		'    \n' +
		'var Person = Class.extend({\n' +
		'  init: function(isDancing){\n' +
		'    this.dancing = isDancing;\n' +
		'  },\n' +
		'  dance: function() {\n' +
		'    return this.dancing;\n' +
		'  }\n' +
		'});\n' +
		' \n' +
		'var Ninja = Person.extend({\n' +
		'  init: function(){\n' +
		'    this._super( false );\n' +
		'  },\n' +
		'\n' +
		'  dance: function(){\n' +
		'    // Call the inherited version of dance()\n' +
		'    return this._super();\n' +
		'  },\n' +
		'  swingSword: function(){\n' +
		'    return true;\n' +
		'  }\n' +
		'});\n' +
		' \n' +
		'this.instance = new Ninja(true);\n'
	};

	samples.inception = { name: "Inception!", code: '// Can you figure out what this sample is doing?\n' +
	'\n' +
	'this.jdls = jdls;\n' +
	'this.inception = new jdls.ObjectGraph("root", jdls);\n'
	};

	exports.DEFAULT_SAMPLE = samples.instructions;

}());