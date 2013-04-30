// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	exports.check = function(name, strict, expectedString, actualString, fail) {
		function failWithQualifier(qualifier) {
			fail("Incorrect " + name + " version. Expected " + qualifier +
				" [" + expectedString + "], but was [" + actualString + "].");
		}

		var expected = parseNodeVersion("expected Node version", expectedString, fail);
		var actual = parseNodeVersion("Node version", actualString, fail);

		if (!process.env.loose) {
			if (actual[0] !== expected[0] || actual[1] !== expected[1] || actual[2] !== expected[2]) {
				failWithQualifier("exactly");
			}
		}
		else {
			if (actual[0] < expected[0]) failWithQualifier("at least");
			if (actual[0] === expected[0] && actual[1] < expected[1]) failWithQualifier("at least");
			if (actual[0] === expected[0] && actual[1] === expected[1] && actual[2] < expected[2]) failWithQualifier("at least");
		}
	};

	function parseNodeVersion(description, versionString, fail) {
		var versionMatcher = /^v(\d+)\.(\d+)\.(\d+)(\-|$)/;    // v[major].[minor].[bugfix]
		var versionInfo = versionString.match(versionMatcher);
		if (versionInfo === null) fail("Could not parse " + description + " (was '" + versionString + "')");

		var major = parseInt(versionInfo[1], 10);
		var minor = parseInt(versionInfo[2], 10);
		var bugfix = parseInt(versionInfo[3], 10);
		return [major, minor, bugfix];
	}

}());