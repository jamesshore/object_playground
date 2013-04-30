// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	describe("ObjectGraph", function() {
		function newGraph(name, object) {
			return new jdls.ObjectGraph(name, object);
		}

		function nodes(object) {
			var graph = newGraph("name", object);
			return graph.nodes().map(function(element) {
				return element.value();
			});
		}

		describe("node traversal", function() {
			it("ignores built-in objects", function() {
				var object = {
					a: Object,
					b: Array,
					c: Function
				};
				expect(nodes(object)).to.eql([object]);
			});

			it("collects all non-built-in nodes", function() {
				var a = { name: "a" };
				var b = { name: "b",
					a: a
				};
				var c = { name: "c",
					b: b
				};

				expect(nodes(c)).to.eql([c, b, a]);
			});

			it("doesn't collect nodes more than once", function() {
				var a = { name: "a" };
				var b = { name: "b",
					a: a
				};
				var c = { name: "c",
					a: a,
					b: b
				};

				expect(nodes(c)).to.eql([c, a, b]);
			});

			it("handles cycles", function() {
				var a = { name: "a" };
				var b = { name: "b" };
				a.b = b;
				b.a = a;

				// expect's eql() method can't handle the cycles here, so we do the assertion manually
				var graph = nodes(a);
				expect(graph.length).to.equal(2);
				expect(graph[0]).to.equal(a);
				expect(graph[1]).to.equal(b);
			});
		});

	});

}());