// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

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

	samples.classical = { name: "Classical Classes", code:
		'function MyClass() {}\n' +
		'MyClass.prototype.method = function aMethod() {};\n' +
		'this.instance = new MyClass();\n'
	};

	samples.inception = { name: "Inception!", code:
		'var object = {\n' +
		'  inner: {}\n' +
		'};\n' +
		'this.graph = new jdls.ObjectGraph("root", object);'
	};
}());