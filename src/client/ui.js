// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// The main user interface.
(function() {
	"use strict";

	var exports = window.jdls.ui = {};

	var userCode;

	exports.initialize = function initialize(userCodeTextArea) {
		userCode = userCodeTextArea;

		populateUserCode(jdls.usercode.samples.DEFAULT);
	};

	function populateUserCode(sample) {
		userCode.value = sample.code;
	}

}());