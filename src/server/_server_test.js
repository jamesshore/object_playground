// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function () {
	"use strict";

	var server = require("./server.js");
	var httpUtil = require("../__http_util.js");

	exports.setUp = function(done) {
		server.start(5000, function() {
			done();
		});
	};

	exports.tearDown = function(done) {
		server.stop(function() {
			done();
		});
	};

	exports.test_respondsToRequests = function(test) {
		httpUtil.getPage("http://localhost:5000", function(error, response, responseText) {
			test.equals(response.statusCode, 200, "status code");
			test.equals(responseText, "Hello World", "response text");
			test.done(error);
		});
	};
}());
