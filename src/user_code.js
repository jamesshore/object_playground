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

	samples.classical = { name: "Classical Class", code:
		'function MyClass() {}\n' +
		'MyClass.prototype.method = function method() {};\n' +
		'this.instance = new MyClass();'
	};

	samples.inheritance = { name: "Classical Inheritance", code:
		'function Parent() {}\n' +
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

	samples.inception = { name: "Inception!", code:
		samples.classical.code + "\n" +
		'this.instance = new jdls.ObjectGraph("root", this.instance);'
	};

	samples.deeper = { name: "We Must Go Deeper", code:
		'this.jdls = jdls;\n' +
		'this.deeper = jdls.usercode.evaluate(jdls.usercode.samples.inception.code);'
	};

	exports.DEFAULT_SAMPLE = samples.classical;

}());