// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

window.jdls = window.jdls || {};

//TODO: deleteme
jdls.debug = function(object, message) {
	"use strict";
	message = message ? " " + message : "";
	dump("Debugging" + message + ":");
	Object.getOwnPropertyNames(object).forEach(function(property) {
		if (property === "caller" || property === "callee" || property === "arguments") return;
		dump("  " + property + ": " + object[property] + " (" + typeof object[property] + ")");
	});
};

(function() {
	"use strict";

	var ObjectNode = jdls.ObjectNode = function ObjectNode(name, value) {
		this._name = objectName(name, value);
		this._value = value;
		this._prototype = Object.getPrototypeOf(value);
	};

	ObjectNode.prototype.name = function name() {
		return this._name;
	};

	ObjectNode.prototype.type = function type() {
		if (this._prototype === null) return "<null>";
		return functionName(this._prototype.constructor);
	};

	ObjectNode.prototype.title = function title() {
		return this.name() + " {" + this.type() + "}";
	};

	function objectName(fallbackName, object) {
		if (typeof object === "function") return functionName(object) + "()";
		if (hasOwnProperty(object, "constructor")) return functionName(object.constructor);
		return fallbackName;
	}

	function functionName(func) {
		var name = func.name;

		if (name === undefined) name = ieFunctionNameWorkaround(func);
		if (name === "") name = "<anon>";
		return name;
	}

	function ieFunctionNameWorkaround(constructor) {
		// This workaround based on code by Jason Bunting et al, http://stackoverflow.com/a/332429
		var funcNameRegex = /function\s+(.{1,})\s*\(/;
		var results = (funcNameRegex).exec((constructor).toString());
		return (results && results.length > 1) ? results[1] : "";
	}

	// can't use object.hasOwnProperty() because it doesn't work when object doesn't inherit from Object
	function hasOwnProperty(object, propertyName) {
		return Object.prototype.hasOwnProperty.call(object, propertyName);
	}

}());
