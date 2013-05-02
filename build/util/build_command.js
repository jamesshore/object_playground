// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var UNIX_BUILD_COMMAND = "./jake.sh";
	var WINDOWS_BUILD_COMMAND = "jake";

	var UNIX_INTEGRATE_COMMAND = "./integrate.sh";
	var WINDOWS_INTEGRATE_COMMAND = "integrate";

	var os = require("os");

	module.exports = function() {
		return os.platform() === "win32" ? WINDOWS_BUILD_COMMAND : UNIX_BUILD_COMMAND;
	};

	module.exports.integrate = function() {
		return os.platform() === "win32" ? WINDOWS_INTEGRATE_COMMAND : UNIX_INTEGRATE_COMMAND;
	}

}());