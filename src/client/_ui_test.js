// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	describe("UI", function() {
		var initialize;
		var userCode;

		beforeEach(function() {
			document.body.innerHTML +=
				"<textarea id='userCode'></textarea>";

			initialize = jdls.ui.initialize;
			userCode = document.getElementById("userCode");
		});

		describe("initialization", function() {

			beforeEach(function() {
				initialize(userCode);
			});

			it("puts default user code into text area", function() {
				expect(userCode.value).to.equal(jdls.usercode.samples.DEFAULT.code);
			});

		});
	});

}());