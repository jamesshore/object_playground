// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

(function() {
	"use strict";

	var exports = window.jdls.viz = {};
	var details = exports.details = {};


	details.nodeToViz = function nodeToViz(node) {
		var header = '"' + node.id() + '" [';
		var labelLine = '\n' + label();
		var shape = '\nshape = "record"';
		var footer = '];\n';

		return header + labelLine + shape + footer;

//		var result = '"' + node.id() + '" [\n' +
//			'label = "<title>' + escapeViz(node.title());
//		var row = 1;
//		node.forEachField(function(name, value, id) {
//			result += '| <' + id + '> ' + escapeViz(name) + ": " + escapeViz(value);
//			row++;
//		});
//		result += '"\nshape = "record"];';
//		return result;

		function label() {
			var title = '<title>' + escape(node.title());
			return 'label = "' + title + fields() + '"';
		}

		function fields() {
			var result = "";
			node.forEachField(function(name, value, id) {
				result += '\n  | <' + id + '> ' + escape(name) + ': ' + escape(value);
			});
			return result;
		}

	};

	function escape(name) {
     return name.
       replace("{", "\\{", "g").
       replace("}", "\\}", "g").
       replace("<", "\\<", "g").
       replace(">", "\\>", "g").
       replace('"', '\\"', "g")
     ;
 }


}());