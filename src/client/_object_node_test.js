// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

(function() {
	"use strict";
	mocha.setup({ignoreLeaks: true});

	describe("ObjectNode", function() {
		function newNode(name, object) {
			return new jdls.ObjectNode(name, object);
		}

		beforeEach(function() {
		});

		describe("type", function() {
			it("is based on constructor name", function() {
				var object = {
					constructor: function TheConstructor() {}
				};
				var node = newNode("name", object);
				expect(node.type()).to.equal("TheConstructor");
			});

			it("works even when constructor is inherited", function() {
				var proto = {
					constructor: function TheConstructor() {}
				};
				var object = Object.create(proto);
				var node = newNode("name", object);
				expect(node.type()).to.equal("TheConstructor");
			});

			it("is anonymous when constructor has no name", function() {
				var object = {
					constructor: function() {}
				};
				var node = newNode("name", object);
				expect(node.type()).to.equal("<anon>");
			});
		});

		describe("name", function() {
			it("is based on provided name for most objects", function() {
				var node = newNode("name", {});
				expect(node.name()).to.equal("name");
			});
		});

	});
}());