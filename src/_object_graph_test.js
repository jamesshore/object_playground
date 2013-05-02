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

		function edges(object) {
			var graph = newGraph("name", object);
			return graph.edges().map(function(element) {
				return [element.from.value(), element.to.value()];
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
			it("filters out 'ordinary' function nodes", function() {
				var object = {
					a: function ignoredFunction() {}
				};
				expect(nodes(object)).to.eql([object]);
			});

			it("filters out edges linking filtered nodes", function() {
				var object = {
					a: function ignoredFunction() {}
				};
				expect(edges(object)).to.eql([]);
			});

			it("filters out 'ordinary' functions with no prototype", function() {
				function ignoredFunction() {}
				var object = {
					a: ignoredFunction
				};
				ignoredFunction.prototype = undefined;
				expect(nodes(object)).to.eql([object]);
			});

			it("shows functions with additional properties", function() {
				function notIgnored() {}
				notIgnored.additionalProperty = "foo";
				var object = {
					a: notIgnored
				};
				expect(nodes(object)).to.eql([object, notIgnored, notIgnored.prototype]);
			});

			it("shows functions whose prototypes have additional properties", function() {
				function notIgnored() {}
				notIgnored.prototype.additionalProperty = "foo";
				var object = {
					a: notIgnored
				};
				expect(nodes(object)).to.eql([object, notIgnored, notIgnored.prototype]);
			});

			it("shows functions that are used as constructors", function() {
				function MyClass() {}
				MyClass.prototype.a = 1;
				var object = new MyClass();
				expect(nodes(object)).to.eql([object, MyClass.prototype, MyClass]);
			});

			it("shows functions that are artificially set as constructors", function() {
				function MyClass() {}
				var object = { constructor: MyClass };
				expect(nodes(object)).to.eql([object, MyClass, MyClass.prototype]);
			});

			it("shows all links to constructor functions, even when link isn't constructor reference", function() {
				function MyClass() {}
				var object = new MyClass();
				var container = [ object, MyClass ];

				expect(edges(container)).to.eql([
					[container, object],
					[object, MyClass.prototype],
					[MyClass.prototype, MyClass],
					[MyClass, MyClass.prototype],
					[container, MyClass]
				]);
			});

			it("shows all links to constructor functions, even when link is found before function is known to be constructor", function() {
				function MyClass() {}
				var object = new MyClass();
				var container = [ MyClass, object ];

				expect(edges(container)).to.eql([
					[container, MyClass],
					[container, object],
					[object, MyClass.prototype],
					[MyClass.prototype, MyClass],
					[MyClass, MyClass.prototype]
				]);
			});

			it("shows functions whose prototype does not point back to itself", function() {
				var object = {};
				function MyClass() {}
				MyClass.prototype = object;

				var container = [ object, MyClass ];
				expect(nodes(container)).to.eql([container, object, MyClass]);
			});

			it("does not crash when examining functions with undefined prototype property", function() {
				function MyClass() {}
				var object = new MyClass();
				MyClass.prototype = undefined;
				expect(nodes(object)).to.eql([object, Object.getPrototypeOf(object), MyClass]);
			});

			it("does not crash when examining functions with null prototype property", function() {
				function MyClass() {}
				var object = new MyClass();
				MyClass.prototype = null;
				expect(nodes(object)).to.eql([object, Object.getPrototypeOf(object), MyClass]);
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