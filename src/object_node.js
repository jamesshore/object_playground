// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

window.jdls = window.jdls || {};

// Each instance is a single object in the object graph.
(function() {
	"use strict";

	var uniqueId = 0;

	var ObjectNode = jdls.ObjectNode = function ObjectNode(name, value) {
		if (typeof value !== "object" && typeof value !== "function") throw new Error("Invalid ObjectNode value: expected function or object, but was " + typeof value);
		if (value === null) throw new Error("Invalid ObjectNode value: expected function or object, but was null");

		this._id = uniqueId++;
		this._name = objectName(name, value);
		this._value = value;
	};

	ObjectNode.prototype.id = function id() {
		return "node" + this._id;
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

	ObjectNode.prototype.properties = function properties() {
		var self = this;
		return getProperties(self._value).map(function(name, index) {
			return {
				name: name,
				value: describeField(self._value[name]),
				id: "f" + index
			};
		});
	};

	ObjectNode.prototype.prototype = function prototype() {
		var value;

		var proto = Object.getPrototypeOf(this._value);
		if (proto === null) value = "null";
		else value = objectName(this._name + ".<prototype>", Object.getPrototypeOf(this._value));

		return {
			name: "<prototype>",
			value: value,
			id: "proto"
		};
	};

	ObjectNode.prototype.forEachSubNode = function forEachSubNode(fn) {
		var self = this;
		forEach(this._value, function(name, value, id) {
			if (typeof value !== "function" && typeof value !== "object") return;
			if (value === null) return;
			fn(new ObjectNode(self._name + "." + name, value), id, name);
		});
	};

	ObjectNode.prototype.equals = function equals(node) {
		return this._value === node._value;
	};

	function objectName(fallbackName, object) {
		if (object === Function.prototype) return "Function.prototype";
		if (typeof object === "function") return functionName(object) + "()";
		if (hasOwnProperty(object, "constructor") && (object.constructor.prototype === object)) return functionName(object.constructor) + ".prototype";
		return fallbackName;
	}

	function objectType(object) {
		var prototype = Object.getPrototypeOf(object);
		if (prototype === null) return "<null>";
		return objectName("<anon>", prototype);
	}

	function functionName(func) {
		var name = func.name;

		if (name === undefined) name = ieFunctionNameWorkaround(func);
		if (name === "") name = "<anon>";
		return name;
	}

	function describeField(value) {
		if (value === null) return "null";
		if (value === Function.prototype) return "Function.prototype";

		switch (typeof value) {
			case "string": return '"' + value + '"';
			case "function":
			case "object":
				return objectName("{" + objectType(value) + "}", value);
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
		getProperties(object).forEach(function(name, index) {
			fn(name, object[name], "f" + index);
		});
		fn("<prototype>", Object.getPrototypeOf(object), "proto");
	}

	function getProperties(object) {
		var names = Object.getOwnPropertyNames(object);
		if (typeof object === "function") names = filterOutRestrictedFunctionProperties();
		return names;

		function filterOutRestrictedFunctionProperties() {
			return names.filter(function(name) {
				return name !== "caller" && name !== "callee" && name !== "arguments";
			});
		}
	}

	// can't use object.hasOwnProperty() because it doesn't work when object doesn't inherit from Object
	function hasOwnProperty(object, propertyName) {
		return Object.prototype.hasOwnProperty.call(object, propertyName);
	}

}());
