// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";
	var server = require("./server/server.js");

	var port = process.argv[2];

	server.start(port, function() {
		console.log("Server started");
	});
}());