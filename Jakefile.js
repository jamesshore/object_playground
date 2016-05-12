// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global desc, task, jake, fail, complete, directory, require, console, process */
(function () {
	"use strict";

	var lint = require("./build/util/lint_runner.js");
	var karma = require("./build/util/karma_runner.js");
	var version = require("./build/util/version_checker.js");

	var TESTED_BROWSERS = [
		// "IE 8.0 (Windows)",  // DOES NOT WORK -- no SVG support
		// "IE 9.0 (Windows)",  // DOES NOT WORK -- no Int32Array support and shim causes 'Out of memory' error
		"IE 10.0.0 (Windows 7)",
		"Firefox 46.0.0 (Mac OS X 10.11)",
		"Chrome 40.0.2214 (Mac OS X 10.11.4)",
		"Safari 8.0.3 (Mac OS X 10.11.4)",
		"Mobile Safari 7.0.0 (iOS 7.1)",
		"IE 11.0.0 (Windows 7)"
	];

	var NODE_VERSION = "v0.10.32";
	var KARMA_CONFIG = "./build/config/karma.conf.js";

	desc("Lint and test");
	task("default", ["lint", "test"], function() {
		console.log("\n\nBUILD OK");
	});

	desc("Start Karma server -- run this first");
	task("karma", function() {
		karma.serve(KARMA_CONFIG, complete, fail);
	}, {async: true});

	desc("Start HTTP server for manual testing");
	task("run", function() {
		jake.exec("node ./node_modules/http-server/bin/http-server ./src", { interactive: true }, complete);
	}, {async: true});

	desc("Lint everything");
	task("lint", ["nodeVersion"], function () {
		var passed = lint.validateFileList(nodeFilesToLint(), nodeLintOptions(), {});
		passed = lint.validateFileList(browserFilesToLint(), browserLintOptions(), browserLintGlobals()) && passed;
		if (!passed) fail("Lint failed");
	});

	desc("Test browser code");
	task("test", function() {
		karma.runTests({
			configFile: KARMA_CONFIG,
			browsers: TESTED_BROWSERS,
			strict: true
		}, complete, fail);
	}, {async: true});

//	desc("Ensure installed version of Node is same as known-good version");
	task("nodeVersion", [], function() {
		var installedVersion = process.version;
		version.check("Node", !process.env.loose, NODE_VERSION, installedVersion, fail);
	});

	function nodeFilesToLint() {
		var files = new jake.FileList();
		files.include("build/util/**/*.js");
		files.include("Jakefile.js");
		return files.toArray();
	}

	function browserFilesToLint() {
		var files = new jake.FileList();
		files.include("src/*.js");
		return files.toArray();
	}

	function sharedLintOptions() {
		return {
			bitwise:true,
			curly:false,
			eqeqeq:true,
			forin:true,
			immed:true,
			latedef:false,
			newcap:true,
			noarg:true,
			noempty:true,
			nonew:true,
			regexp:true,
			undef:true,
			strict:true,
			trailing:true
		};
	}

	function nodeLintOptions() {
		var options = sharedLintOptions();
		options.node = true;
		return options;
	}

	function browserLintOptions() {
		var options = sharedLintOptions();
		options.browser = true;
		return options;
	}

	function browserLintGlobals() {
		return {
			jdls: true,

			console: false,
			mocha: false,
			describe: false,
			it: false,
			expect: false,
			dump: false,
			beforeEach: false,
			afterEach: false
		};
	}

}());