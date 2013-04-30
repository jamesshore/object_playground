// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	describe("ObjectGraph", function() {
		function newGraph(name, object, options) {
			return new jdls.ObjectGraph(name, object, options);
		}

		function nodes(object, options) {
			var graph = newGraph("name", object, options);
			return graph.nodes().map(function(element) {
				return element.value();
			});
		}

		describe("node collection", function() {
			it("recursively collects nodes", function() {
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

		describe("edge collection", function() {
			function edges(object) {
				var graph = newGraph("name", object);
				return graph.edges().map(function(element) {
					return [element.from.value(), element.to.value()];
				});
			}

			it("recursively collects edges", function() {
				var a = { name: "a" };
				var b = { name: "b",
					a: a
				};
				var c = { name: "c",
					b: b
				};

				expect(edges(c)).to.eql([
					[c, b],
					[b, a]
				]);
			});

			it("uses identical node objects when multiple edges connect to the same nodes", function() {
				var a = { name: "a" };
				var b = { name: "b" };
				a.b = b;
				b.a = a;

				var edges = newGraph("name", a).edges();
				expect(edges[0].from).to.equal(edges[1].to);
				expect(edges[1].from).to.equal(edges[0].to);
			});

			it("includes ID for origin node's field", function() {
				var a = { name: "a" };
				var b = { name: "b",
					a: a
				};
				var edges = newGraph("name", b).edges();
				expect(edges[0].fromField).to.equal("f1");
			});
		});

		describe("built-in object filtering", function() {
			it("ignores built-in objects", function() {
				var object = {
					a: Object.prototype,
					b: Array.prototype,
					c: Function.prototype
				};
				expect(nodes(object)).to.eql([object]);
			});

			it("can be turned off", function() {
				expect(nodes(Object, { builtins: true })).to.eql([
					Object, Object.prototype, Function.prototype, Function
				]);
			});
		});

		describe("function filtering", function() {
			it("ignores functions with no unusual properties", function() {
				var object = {
					a: function ignoredFunction() {}
				};
				expect(nodes(object)).to.eql([object]);
			});

			it("does not ignore functions that are constructors", function() {
				function MyClass() {}
				MyClass.prototype.a = 1;
				var object = new MyClass();
				expect(nodes(object)).to.eql([object, MyClass.prototype, MyClass]);
			});

			it("does not crash when examining functions with undefined prototype property", function() {
				function MyClass() {}
				var object = new MyClass();
				MyClass.prototype = undefined;
				expect(nodes(object)).to.eql([object, Object.getPrototypeOf(object)]);
			});

			it("does not crash when examining functions with null prototype property", function() {
				function MyClass() {}
				var object = new MyClass();
				MyClass.prototype = null;
				expect(nodes(object)).to.eql([object, Object.getPrototypeOf(object)]);
			});

			it("can be turned off", function() {
				function aFunction() {}
				var object = { a: aFunction };
				expect(nodes(object, { allFunctions: true })).to.eql([
					object,
					aFunction,
					aFunction.prototype
				]);
			});
		});
	});

}());