// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var UNIX_BUILD_COMMAND = "./jake.sh";
	var WINDOWS_BUILD_COMMAND = "jake";

	var os = require("os");

	exports.get = function() {
		return os.platform() === "win32" ? WINDOWS_BUILD_COMMAND : UNIX_BUILD_COMMAND;
	};

}());