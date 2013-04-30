// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	describe("Viz.js Visualizer", function() {
		var graph;
		var details;

		beforeEach(function() {
			var object = {
				a: {
					b: "b"
				}
			};
			graph = new jdls.ObjectGraph("name", object);
			details = jdls.viz.details;
		});

		it("converts nodes", function() {
			var node = new jdls.ObjectNode("name", { a: 1 });

			expect(details.nodeToViz(node)).to.equal(
				'"' + node.id() + '" [\n' +
				'label = "<title>name \\{Object\\}\n' +
				'  | <f0> a: 1\n' +
				'  | <proto> \\<prototype\\>: Object"\n' +
				'shape = "record"];\n'
			);

//			var result = '"' + node.id() + '" [\n' +
//				'label = "<title>' + escapeViz(node.title());
//			var row = 1;
//			node.forEachField(function(name, value, id) {
//				result += '| <' + id + '> ' + escapeViz(name) + ": " + escapeViz(value);
//				row++;
//			});
//			result += '"\nshape = "record"];';
//			return result;

		});

//		describe("node conversion", function() {
//			it("")
//
//
//		});

	});

}());