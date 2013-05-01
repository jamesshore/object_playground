// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

(function() {
	"use strict";

	var exports = window.jdls.viz = {};
	var details = exports.details = {};

	exports.render = function render(rootName, object) {
		return details.vizToSvg(details.graphToViz(new jdls.ObjectGraph(rootName, object)));
	};

	details.graphToViz = function graphToViz(graph) {
		var header =
			'digraph g {\n' +
			'  graph [\n' +
			'    rankdir = "LR"\n' +
			'  ];\n' +
			'  node [\n' +
			'    fontsize = "16"\n' +
			'    shape = "ellipse"\n' +
			'  ];\n' +
			'  edge [];\n';
		var footer = '}\n';

		return header + nodes() + edges() + footer;

		function nodes() {
			return graph.nodes().map(function(node) {
				return details.nodeToViz(node);
			}).join("");
		}

		function edges() {
			return graph.edges().map(function(edge) {
				return details.edgeToViz(edge);
			}).join("");
		}
	};

	details.vizToSvg = function vizToSvg(vizCode) {
		/*jshint newcap:false */
		/*global Viz */
		return Viz(vizCode, "svg");
	};

	details.nodeToViz = function nodeToViz(node) {
		var header = '"' + node.id() + '" [';
		var labelLine = '\n' + label();
		var shape = '\nshape = "record"';
		var footer = '];\n';

		return header + labelLine + shape + footer;

		function label() {
			var title = '<title>' + escape(node.title());
			return 'label = "' + title + fields() + '"';
		}

		function fields() {
			var result = "";
			node.forEachField(function(name, value, id) {
				result += '| <' + id + '> ' + escape(name) + ': ' + escape(value);
			});
			return result;
		}
	};

	details.edgeToViz = function edgeToViz(edge) {
		return '"' + edge.from.id() + '":' + edge.fromField + ' -> "' + edge.to.id() + '":title [];';
	};

	var escape = details.escape = function escape(name) {
		return name.
			replace(/\\/g, '\\\\').
			replace(/\{/g, "\\{").
			replace(/\}/g, "\\}").
			replace(/</g, "\\<").
			replace(/>/g, "\\>").
			replace(/\|/g, '\\|').
			replace(/\"/g, '\\"').
			replace(/\n/g, ' ').
			replace(/\t/g, ' ');
	};

}());
