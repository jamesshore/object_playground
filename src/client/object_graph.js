// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

(function() {
	"use strict";

	var ObjectGraph = jdls.ObjectGraph = function ObjectGraph(name, root) {
		this._nodes = [];
		this._edges = [];
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
		node.forEachSubNode(function(subnode) {
			if (isBuiltin(subnode)) return;

			subnode = dedupe(self, subnode);
			addEdge(self, node, subnode);
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

	function addEdge(self, from, to) {
		self._edges.push({
			from: from,
			to: to
		});
	}

	function isBuiltin(node) {
		return node.name() === "Object" ||
			node.name() === "Array" ||
			node.type() === "Function";
	}

}());