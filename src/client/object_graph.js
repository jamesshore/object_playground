// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

(function() {
	"use strict";

	var ObjectGraph = jdls.ObjectGraph = function ObjectGraph(name, root, options) {
		options = options || {};

		this._nodes = [];
		this._edges = [];
		this._showBuiltins = !!options.builtins;
		this._showAllFunctions = !!options.allFunctions;
		traverse(this, new jdls.ObjectNode(name, root));
	};

	ObjectGraph.prototype.nodes = function nodes() {
		return this._nodes;
	};

	ObjectGraph.prototype.edges = function edges() {
		return this._edges;
	};

	function traverse(self, node) {
		if (hasNode(self, node)) return;

		addNode(self, node);
		node.forEachSubNode(function(subnode, id) {
			if (isBuiltin(subnode) && !self._showBuiltins) return;
			if (isOrdinaryFunction(subnode) && !self._showAllFunctions) return;

			subnode = dedupe(self, subnode);
			addEdge(self, node, subnode, id);
			traverse(self, subnode);
		});
	}

	function hasNode(self, node) {
		return findNode(self, node) !== undefined;
	}

	function dedupe(self, node) {
		return findNode(self, node) || node;
	}

	function findNode(self, node) {
		var matchingNodes = self._nodes.filter(function(element) {
			return element.equals(node);
		});
		if (matchingNodes.length > 1) throw new Error("Node [" + node.title() + "] was stored multiple times; that should be impossible");
		return matchingNodes[0];
	}

	function addNode(self, node) {
		self._nodes.push(node);
	}

	function addEdge(self, from, to, fromField) {
		self._edges.push({
			from: from,
			to: to,
			fromField: fromField
		});
	}

	function isBuiltin(node) {
		return node.name() === "Object" ||
			node.name() === "Array" ||
			node.name() === "Function";
	}

	function isOrdinaryFunction(node) {
		var func = node.value();

		if (typeof func !== "function") return false;
		if (hasUnusualProperties(func, ["length", "name", "caller", "arguments", "prototype"])) return false;
		if (hasUnusualProperties(func.prototype, ["constructor"])) return false;
		return true;

		function hasUnusualProperties(obj, normalProperties) {
			if (obj === undefined || obj === null) return false;

			var unusualProperties = Object.getOwnPropertyNames(obj).filter(function(property) {
				return normalProperties.indexOf(property) === -1;
			});
			return (unusualProperties.length !== 0);
		}
	}

}());