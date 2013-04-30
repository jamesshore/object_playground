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

		describe("name", function() {
			it("is based on provided name for most objects", function() {
				var node = newNode("name", {});
				expect(node.name()).to.equal("name");
			});

			it("doesn't crash when object has no prototype", function() {
				var node = newNode("name", Object.create(null));
				expect(node.name()).to.equal("name");
			});

			it("uses function name for functions", function() {
				var node = newNode("name", function aFunction() {});
				expect(node.name()).to.equal("aFunction()");
			});

			it("is anonymous for unnamed functions", function() {
				var node = newNode("name", function() {});
				expect(node.name()).to.equal("<anon>()");
			});

			it("uses constructor name when present", function() {
				var object = {
					constructor: function TheConstructor() {}
				};
				var node = newNode("name", object);
				expect(node.name()).to.equal("TheConstructor");
			});

			it("does not use inherited constructor name", function() {
				var proto = {
					constructor: function TheConstructor() {}
				};
				var object = Object.create(proto);
				var node = newNode("name", object);
				expect(node.name()).to.equal("name");
			});
		});

		describe("type", function() {
			it("is based on prototype's constructor name", function() {
				var proto = {
					constructor: function TheConstructor() {}
				};

				var object = Object.create(proto);
				object.constructor = function NotThisOne() {};

				var node = newNode("name", object);
				expect(node.type()).to.equal("TheConstructor");
			});

			it("works even when prototype's constructor is inherited", function() {
				var grandfather = {
					constructor: function TheConstructor() {}
				};
				var proto = Object.create(grandfather);
				var node = newNode("name", Object.create(proto));
				expect(node.type()).to.equal("TheConstructor");
			});

			it("is null when object has no prototype", function() {
				var node = newNode("name", Object.create(null));
				expect(node.type()).to.equal("<null>");
			});

			it("is anonymous when constructor has no name", function() {
				var proto = {
					constructor: function() {}
				};
				var node = newNode("name", Object.create(proto));
				expect(node.type()).to.equal("<anon>");
			});

			it("is anonymous when prototype has no constructor", function() {
				var proto = Object.create(null);
				var node = newNode("name", Object.create(proto));
				expect(node.type()).to.equal("<anon>");
			});

			it("is anonymous when prototype constructor is not a function", function() {
				var proto = {
					constructor: "malformed constructor"
				};
				var node = newNode("name", Object.create(proto));
				expect(node.type()).to.equal("<anon>");
			});

			it("is anonymous when prototype constructor is null", function() {
				var proto = {
					constructor: null
				};
				var node = newNode("name", Object.create(proto));
				expect(node.type()).to.equal("<anon>");
			});
		});

		it("title is just name + type", function() {
			var node = newNode("name", {});
			expect(node.title()).to.equal("name {Object}");
		});

		describe("fields", function() {
			function fields(object) {
				var result = [];
				var node = newNode("name", object);
				node.forEachField(function(name, value) {
					result.push({ name: name, value: value });
				});
				return result;
			}

			function conversionOf(variable) {
				var object = { name: variable };
				return fields(object)[0].value;
			}

			it("provides each field and the prototype", function() {
				var object = {
					a: 1,
					b: 2,
					c: 3
				};
				expect(fields(object)).to.eql([
					{ name: "a", value: "1" },
					{ name: "b", value: "2" },
					{ name: "c", value: "3" },
					{ name: "<prototype>", value: "Object" }
				]);
			});

			it("converts primitives", function() {
				expect(conversionOf(undefined)).to.equal("undefined");
				expect(conversionOf(null)).to.equal("null");

				expect(conversionOf(true)).to.equal("true");
				expect(conversionOf(false)).to.equal("false");

				expect(conversionOf(0)).to.equal("0");
				expect(conversionOf(1)).to.equal("1");

				expect(conversionOf("string")).to.equal('"string"');
			});

			it("converts functions", function() {
				expect(conversionOf(function aFunction() {})).to.equal("aFunction()");
				expect(conversionOf(function () {})).to.equal("<anon>()");
			});

			it("converts objects to their names when they have one", function() {
				function MyClass() {}
				expect(conversionOf(MyClass.prototype)).to.equal("MyClass");
			});

			it("converts objects to their types when they don't have a name", function() {
				expect(conversionOf({})).to.equal("{Object}");
			});

			it("converts the prototype in the same way as other fields", function() {
				var proto = {
					constructor: function MyClass() {}
				};
				expect(fields(Object.create(proto))).to.eql([
					{ name: "<prototype>", value: "MyClass" }
				]);
			});
		});

	});
}());