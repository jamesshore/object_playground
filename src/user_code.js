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

	samples.classical = { name: "Classical Class", code: 'function MyClass() {}\n' +
		'MyClass.prototype.method = function method() {};\n' +
		'this.instance = new MyClass();'
	};

	samples.inheritance = { name: "Classical Inheritance", code: 'function Parent() {}\n' +
		'Parent.prototype.method = function method() {};\n' +
		'\n' +
		'function Child() {\n' +
		'  Parent.call(this);\n' +
		'}\n' +
		'Child.prototype = new Parent();\n' +
		'Child.prototype.constructor = Child;\n' +
		'Child.prototype.method = function method() {\n' +
		'  Parent.prototype.method.call(this);\n' +
		'};\n' +
		'\n' +
		'this.instance = new Child();'
	};

	samples.resig = { name: "John Resig",
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

//	samples.sugar = { name: "",
//		code: "TBD"
// }

	samples.inception = { name: "Inception!", code: samples.classical.code + "\n" +
		'this.instance = new jdls.ObjectGraph("root", this.instance);'
	};

	samples.deeper = { name: "We Must Go Deeper", code: 'this.jdls = jdls;\n' +
		'this.deeper = jdls.usercode.evaluate(jdls.usercode.samples.inception.code);'
	};

	exports.DEFAULT_SAMPLE = samples.classical;

	function resig() {
		/* Simple JavaScript Inheritance
		 * By John Resig http://ejohn.org/
		 * MIT Licensed.
		 */
		// Inspired by base2 and Prototype
		(function() {
			var initializing = false, fnTest = /xyz/.test(function() {xyz;}) ? /\b_super\b/ : /.*/;
			// The base Class implementation (does nothing)
			this.Class = function() {};

			// Create a new Class that inherits from this class
			Class.extend = function(prop) {
				var _super = this.prototype;

				// Instantiate a base class (but only create the instance,
				// don't run the init constructor)
				initializing = true;
				var prototype = new this();
				initializing = false;
				// Copy the properties over onto the new prototype
				for (var name in prop) {
					// Check if we're overwriting an existing function
					prototype[name] = typeof prop[name] == "function" &&
						typeof _super[name] == "function" && fnTest.test(prop[name]) ?
						(function(name, fn) {
							return function() {
								var tmp = this._super;
								// Add a new ._super() method that is the same method
								// but on the super-class
								this._super = _super[name];
								// The method only need to be bound temporarily, so we
								// remove it when we're done executing
								var ret = fn.apply(this, arguments);
								this._super = tmp;

								return ret;
							};
						})(name, prop[name]) :
						prop[name];
				}

				// The dummy class constructor
				function Class() {
					// All construction is actually done in the init method
					if (!initializing && this.init) {
						this.init.apply(this, arguments);
					}
				}

				// Populate our constructed prototype object
				Class.prototype = prototype;

				// Enforce the constructor to be what we expect
				Class.prototype.constructor = Class;

				// And make this class extendable
				Class.extend = arguments.callee;

				return Class;
			};
		})();
		var Person = Class.extend({
			init: function(isDancing) {
				this.dancing = isDancing;
			},
			dance: function() {
				return this.dancing;
			}
		});

		var Ninja = Person.extend({
			init: function() {
				this._super(false);
			},

			dance: function() {
				// Call the inherited version of dance()
				return this._super();
			},
			swingSword: function() {
				return true;
			}
		});

		this.instance = new Ninja(true);
		this.Ninja = Ninja;
		this.Person = Person;
		this.Class = Class;
	}

}());