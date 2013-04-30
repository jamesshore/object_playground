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

		it("escapes strings", function() {
			var esc = details.escape;
			expect(esc("<>")).to.equal("\\<\\>");
			expect(esc("{}")).to.equal("\\{\\}");
			expect(esc("|")).to.equal("\\|");
			expect(esc('"')).to.equal('\\"');
			expect(esc("\\")).to.equal("\\\\");
		});

		it("converts nodes", function() {
			var node = new jdls.ObjectNode("name", { a: 1 });

			expect(details.nodeToViz(node)).to.equal(
				'"' + node.id() + '" [\n' +
				'label = "<title>name \\{Object\\}| <f0> a: 1| <proto> \\<prototype\\>: Object"\n' +
				'shape = "record"];\n'
			);
		});

		it("converts edges", function() {
			var edge = graph.edges()[0];
			var fromId = graph.nodes()[0].id();
			var toId = graph.nodes()[1].id();

			expect(details.edgeToViz(edge)).to.equal(
				'"' + fromId + '":f0 -> "' + toId + '":title [];'
			);
		});

		it("converts entire graph", function() {
			var fromNode = graph.nodes()[0];
			var toNode = graph.nodes()[1];
			var edge = graph.edges()[0];

			expect(details.graphToViz(graph)).to.equal(
				'digraph g {\n' +
				'  graph [\n' +
				'    rankdir = "LR"\n' +
				'  ];\n' +
				'  node [\n' +
				'    fontsize = "16"\n' +
				'    shape = "ellipse"\n' +
				'  ];\n' +
				'  edge [];\n' +
				details.nodeToViz(fromNode) +
				details.nodeToViz(toNode) +
				details.edgeToViz(edge) +
				'}\n'
			);


//			var header =
//					'digraph g {' +
//						'  graph [' +
//						'    rankdir = "LR"' +
//						'  ];' +
//						'  node [' +
//						'    fontsize = "16"' +
//						'    shape = "ellipse"' +
//						'  ];' +
//						'  edge [' +
//						'  ];'
//				;
//			var nodes = '';
//			var edges = '';
//			var footer = '}';

		});

	});

}());