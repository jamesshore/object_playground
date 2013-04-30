// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global desc, task, jake, fail, complete, directory, require, console, process */
(function () {
	"use strict";

	var TESTED_BROWSERS = [
		"IE 8.0 (Windows)",
		"IE 9.0 (Windows)",
		"Firefox 20.0 (Mac)",
		"Chrome 26.0 (Mac)",
		"Safari 6.0 (Mac)",
		"Safari 6.0 (iOS)"
	];

	var lint = require("./build/util/lint_runner.js");
	var nodeunit = require("./build/util/nodeunit_runner.js");
	var karma = require("./build/util/karma_runner.js");
	var version = require("./build/util/version_checker.js");

	desc("Lint and test");
	task("default", ["lint", "test"], function() {
		console.log("\n\nOK");
	});

	desc("Start Karma server -- run this first");
	task("karma", function() {
		karma.serve(complete, fail);
	}, {async: true});

	desc("Lint everything");
	task("lint", ["nodeVersion"], function () {
		var passed = lint.validateFileList(nodeFilesToLint(), nodeLintOptions(), {});
		passed = lint.validateFileList(browserFilesToLint(), browserLintOptions(), {}) && passed;
		if (!passed) fail("Lint failed");
	});

	desc("Test everything");
	task("test", ["testServer", "testClient"]);

	desc("Test node.js code");
	task("testServer", function() {
		nodeunit.runTests(nodeFilesToTest(), complete, fail);
	}, {async: true});

	desc("Test browser code");
	task("testClient", function() {
		karma.runTests(TESTED_BROWSERS, complete, fail);
	}, {async: true});

//	desc("Ensure installed version of Node is same as deployed version");
	task("nodeVersion", [], function() {
		var deployedVersion = "v" + require("./package.json").engines.node;
		var installedVersion = process.version;
		version.check("Node", !process.env.loose, deployedVersion, installedVersion, fail);
	});

	function nodeFilesToTest() {
		var testFiles = new jake.FileList();
		testFiles.include("src/_*_test.js");
		testFiles.include("src/server/**/_*_test.js");
		testFiles.exclude("node_modules");
		var tests = testFiles.toArray();
		return tests;
	}

	function nodeFilesToLint() {
		var files = new jake.FileList();
		files.include("src/*.js");
		files.include("src/server/**/*.js");
		files.include("build/util/**/*.js");
		files.include("Jakefile.js");
		return files.toArray();
	}

	function browserFilesToLint() {
		var files = new jake.FileList();
		files.include("src/client/**/*.js");
		return files.toArray();
	}

	function globalLintOptions() {
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
		var options = globalLintOptions();
		options.node = true;
		return options;
	}

	function browserLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		return options;
	}

}());