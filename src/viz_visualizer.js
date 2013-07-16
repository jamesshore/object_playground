// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
/*global Viz */

window.jdls = window.jdls || {};

// Functions for turning an object graph into SVG.
(function() {
	"use strict";

	var exports = window.jdls.viz = {};
	var details = exports.details = {};

	exports.render = function render(rootName, object, options) {
		return details.vizToSvg(details.graphToViz(new jdls.ObjectGraph(rootName, object, options)));
	};

	details.vizToSvg = function vizToSvg(vizCode) {
		/*jshint newcap:false */
		return Viz(vizCode, "svg");
	};

	details.graphToViz = function graphToViz(graph) {
		return '' +
			'digraph g {\n' +
			'  graph [\n' +
			'    rankdir = "LR"\n' +
			'  ];\n' +
			'  node [\n' +
			'    fontsize = "12"\n' +
			'    shape = "plaintext"\n' +   // 'plaintext' is misnamed; it enables HTML-like formatting
			'  ];\n' +
			'  edge [];\n' +
			'  \n' +
			nodes() +
			edges() +
			'}\n';

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

	details.nodeToViz = function nodeToViz(node) {

//			'label = "' + '<title>' + escape(node.title()) + fields() + '"\n' +
//			'shape = "record"' +
//			'];\n';

		return '' +
			'  "' + node.id() + '" [label=<\n' +
			'    <table>\n' +
			'      <th><td>' + escapeHtml(node.title()) + '</td></th>\n' +
			fields() +
			'    </table>\n' +
			'  >];\n';

		function fields() {
			var result = "";
			node.forEachField(function(name, value, id) {
				result += '      <tr><td port="' + id + '">' + escapeHtml(name) + ': ' + escapeHtml(value) + '</td></tr>\n';

//				result += '| <' + id + '> ' + escape(name) + ': ' + escape(value);
			});
			return result;
		}
	};

	details.edgeToViz = function edgeToViz(edge) {
		return '"' + edge.from.id() + '":' + edge.fromField + ' -> "' + edge.to.id() + '":title [];';
	};

	var escapeViz = details.escapeViz = function escapeViz(name) {
		return name.
			replace(/\\/g, '\\\\').
			replace(/\{/g, "\\{").
			replace(/\}/g, "\\}").
			replace(/</g, "\\<").
			replace(/>/g, "\\>").
			replace(/\|/g, '\\|').
			replace(/\"/g, '\\"').
			replace(/\n/g, '\\n').
			replace(/\t/g, ' ');
	};

	var escapeHtml = details.escapeHtml = function escapeHtml(html) {
		return html.
			replace(/&/g, "&amp;").
			replace(/</g, "&lt;").
			replace(/>/g, "&gt;").
			replace(/"/g, "&quot;").
			replace(/'/g, "&#039;").
			replace(/\n/g, '<br />').
			replace(/\t/g, '  ');
	};

}());
