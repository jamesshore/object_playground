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
		});

//		it("collects all nodes", function() {
//			var a = {};
//			var b = {
//				a: a
//			};
//			var c = {
//				b: b
//			};
//
//			expect(nodes(c)).to.eql([c, b, a]);
//		});

//		it("doesn't collect nodes more than once");
//		it ("handles cycles");
	});

}());