// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// The main user interface.
(function() {
	"use strict";

	var exports = window.jdls.ui = {};
	var userCode;
	var evaluate;
	var graph;

	exports.initialize = function initialize(userCodeTextArea, evaluateButton, graphDiv) {
		userCode = userCodeTextArea;
		evaluate = evaluateButton;
		graph = graphDiv;

		populateUserCode(jdls.usercode.samples.DEFAULT);
		renderUserCode();
		addEventHandlers();
	};

	function addEventHandlers() {
		evaluate.addEventListener("click", function() {
			renderUserCode();
		});
	}

	function populateUserCode(sample) {
		userCode.value = sample.code;
	}

	function renderUserCode() {
		try {
			graph.innerHTML = jdls.viz.render("this", jdls.usercode.evaluate(userCode.value));
		}
		catch(err) {
			graph.innerHTML = inspect(err.toString());
		}
	}

	function inspect(string) {
   return "<pre>" + string.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;") + "</pre>";
 }

}());