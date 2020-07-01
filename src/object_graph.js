// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// Instances catalog all objects reachable from a root object.
(function() {
	"use strict";

	var ObjectGraph = jdls.ObjectGraph = function ObjectGraph(name, root, options) {
		options = options || {};

		this._nodes = [];
		this._edges = [];
		this._showBuiltins = !!options.builtins;
		this._showAllFunctions = !!options.allFunctions;

		// This algorithm is O(n^2) because hasNode is O(n). :-(
		// It will be much faster when we can replace this._nodes with Set, which should be O(1).
		// (Set is a new data type coming in a future version of JavaScript.)
		traverse(this, new jdls.ObjectNode(name, root));
		removePartialEdges(this);
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
		node.forEachSubNode(function(subnode, id, name) {
			if (isBuiltin(subnode) && !self._showBuiltins) return;

			subnode = dedupe(self, subnode);
			addEdge(self, node, subnode, id);
			if (isOrdinaryFunction(subnode, name) && !self._showAllFunctions) return;
			traverse(self, subnode);
		});
	}

	function removePartialEdges(self) {
		// When traversing, we add edges for some subnodes that are not traversed. This is necessary
		// because the decision of which subnode to traverse is context-dependent, so sometimes we'll
		// decide to filter out a subnode that's later included. We add an edge regardless so it will be present
		// if the node is later included. If the node never was included, we filter it out here.

		var result = [];
		self._edges.forEach(function(element) {
			// We're going to figure out if the 'to' node is present, and if it is, we'll use the one that's in
			// _nodes rather than the one stored in the edge. That's because the edge may refer to a node that
			// was filtered out, if the edge found before the node was known to be interesting.
			// Note: It's impossible for the 'from' node to be missing due to the way the traversal algorithm works.

			// This code a more complicated way of saying (paraphrased) "if (hasNode()) dedupe();". It's a bit faster.
			var node = findNode(self, element.to);
			if (node !== undefined) {
				element.to = node;
				result.push(element);
			}
		});
		self._edges = result;
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
		if (matchingNodes.length > 1) throw new Error("Node [" + node.name() + "] was stored multiple times; that should be impossible");
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
		var value = node.value();
		return value === Object.prototype ||
			value === Function.prototype ||
			value === Array.prototype ||
			value === String.prototype ||
			value === Boolean.prototype ||
			value === Number.prototype ||
			value === Date.prototype ||
			value === RegExp.prototype ||
			value === Error.prototype ||
			typeof BigInt !== 'undefined' && value === BigInt.prototype; // jshint ignore:line
	}

	function isOrdinaryFunction(node, propertyName) {
		var func = node.value();
		if (typeof func !== "function") return false;

		var prototype = func.prototype;
		if (prototype && typeof prototype !== "object") return false;

		var constructor = propertyName === "constructor";
		var standardFunction = !hasUnusualProperties(func, ["length", "name", "caller", "arguments", "prototype"]);
		var standardPrototype = !hasUnusualProperties(prototype, ["constructor"]);
		var selfReferencingPrototype = !prototype || prototype.constructor === func;

		return !constructor && standardFunction && standardPrototype && selfReferencingPrototype;

		function hasUnusualProperties(obj, normalProperties) {
			if (obj === undefined || obj === null) return false;

			var unusualProperties = Object.getOwnPropertyNames(obj).filter(function(property) {
				return normalProperties.indexOf(property) === -1;
			});
			return (unusualProperties.length !== 0);
		}
	}

}());