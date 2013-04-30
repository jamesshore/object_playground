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
		this._name = name;
		this._object = value;
	};

	ObjectNode.prototype.name = function name() {
		return this._name;
	};

	ObjectNode.prototype.type = function type() {
		var constructor = this._object.constructor;
		var name = constructor.name;

		if (name === undefined) name = ieConstructorNameWorkaround(constructor);
		if (name === "") name = "<anon>";
		return name;
	};

	// This workaround based on code by Jason Bunting et al, http://stackoverflow.com/a/332429
	function ieConstructorNameWorkaround(constructor) {
		var funcNameRegex = /function\s+(.{1,})\s*\(/;
		var results = (funcNameRegex).exec((constructor).toString());
		return (results && results.length > 1) ? results[1] : "";
	}

}());
