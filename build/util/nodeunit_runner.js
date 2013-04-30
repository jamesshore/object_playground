// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var nodeunit = require("nodeunit");

	var REPORTER = "default";

	exports.runTests = function(testFiles, success, fail) {
		nodeunit.reporters[REPORTER].run(testFiles, null, function(failures) {
			if (failures) fail("Tests failed");
			else success();
		});
	};

}());