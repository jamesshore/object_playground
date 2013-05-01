// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	describe("user code", function() {
		var evaluate;

		beforeEach(function() {
			evaluate = jdls.usercode.evaluate;
		});

		it("evaluates to an object", function() {
			var code = "" +
				"this.foo = {" +
				"  a: 1," +
				"  b: 2" +
				"}";

			expect(evaluate(code)).to.eql({
				foo: {
					a: 1,
					b: 2
				}
			});
		});

	});

}());