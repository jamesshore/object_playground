// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var http = require("http");
	var server;

	exports.start = function(portNumber, callback) {
		server = http.createServer();
		server.on("request", function(request, response) {
			response.end("Hello World");
		});
		server.listen(portNumber, callback);
	};

	exports.stop = function(callback) {
		server.close(callback);
	};
}());