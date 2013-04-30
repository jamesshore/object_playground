// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

window.jdls = window.jdls || {};

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
		return objectType(this._value);
	};

	ObjectNode.prototype.value = function value() {
		return this._value;
	};

	ObjectNode.prototype.title = function title() {
		return this.name() + " {" + this.type() + "}";
	};

	ObjectNode.prototype.forEachField = function forEachField(fn) {
		forEach(this._value, function(name, value) {
			fn(name, describeField(value));
		});
	};

	ObjectNode.prototype.forEachSubNode = function forEachSubNode(fn) {
		var self = this;
		forEach(this._value, function(name, value) {
			if (typeof value !== "function" && typeof value !== "object") return;
			if (value === null) return;
			fn(new ObjectNode(self._name + "." + name, value));
		});
	};

	function objectName(fallbackName, object) {
		if (typeof object === "function") return functionName(object) + "()";
		if (hasOwnProperty(object, "constructor")) return functionName(object.constructor);
		return fallbackName;
	}

	function objectType(object) {
		var prototype = Object.getPrototypeOf(object);
		if (prototype === null) return "<root>";
		if (prototype.constructor === undefined || prototype.constructor === null) return "<anon>";
		return functionName(prototype.constructor);
	}

	function functionName(func) {
		var name = func.name;

		if (name === undefined) name = ieFunctionNameWorkaround(func);
		if (name === "") name = "<anon>";
		return name;
	}

	function describeField(value) {
		if (value === null) return "null";

		switch (typeof value) {
			case "string": return '"' + value + '"';
			case "function": return functionName(value) + "()";
			case "object": return objectName("{" + objectType(value) + "}", value);
			default: return "" + value;
		}
	}

	function ieFunctionNameWorkaround(constructor) {
		// This workaround is based on code by Jason Bunting et al, http://stackoverflow.com/a/332429
		var funcNameRegex = /function\s+(.{1,})\s*\(/;
		var results = (funcNameRegex).exec((constructor).toString());
		return (results && results.length > 1) ? results[1] : "";
	}

	function forEach(object, fn) {
		getProperties(object).forEach(function(name) {
			fn(name, object[name]);
		});
		fn("<prototype>", Object.getPrototypeOf(object));
	}

	function getProperties(object) {
		return Object.getOwnPropertyNames(object);
	}

	// can't use object.hasOwnProperty() because it doesn't work when object doesn't inherit from Object
	function hasOwnProperty(object, propertyName) {
		return Object.prototype.hasOwnProperty.call(object, propertyName);
	}

}());
