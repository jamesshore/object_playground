// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var jake = require("jake");

	exports.runMany = function(commands, successCallback, failureCallback) {
		var stdout = [];
		function serializedSh(command) {
			if (command) {
				run(command, function(oneStdout) {
					stdout.push(oneStdout);
					serializedSh(commands.shift());
				}, failureCallback);
			}
			else {
				successCallback(stdout);
			}
		}
		serializedSh(commands.shift());
	};

	var run = exports.run = function(oneCommand, successCallback, failureCallback) {
		var stdout = "";
		var process = jake.createExec(oneCommand, {printStdout:true, printStderr:true});
		process.on("stdout", function(data) {
			stdout += data;
		});
		process.on("cmdEnd", function() {
			successCallback(stdout);
		});
		process.on("error", function() {
			failureCallback(stdout);
		});

		console.log("> " + oneCommand);
		process.run();
	};

}());