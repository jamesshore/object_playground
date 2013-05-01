// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// The main user interface.
(function() {
	"use strict";

	var exports = window.jdls.ui = {};
	var samples;
	var userCode;
	var evaluate;
	var graph;

	exports.initialize = function initialize(samplesList, userCodeTextArea, evaluateButton, graphDiv) {
		samples = samplesList;
		userCode = userCodeTextArea;
		evaluate = evaluateButton;
		graph = graphDiv;

		populateSampleButtons();
		replaceUserCode(jdls.usercode.DEFAULT_SAMPLE);

		addEventHandlers();
	};

	function addEventHandlers() {
		evaluate.addEventListener("click", function() {
			renderUserCode();
		});
	}

	function populateSampleButtons() {
		Object.getOwnPropertyNames(jdls.usercode.samples).forEach(function(name) {
			var sample = jdls.usercode.samples[name];
			var button = document.createElement("li");
			button.innerHTML = "<input type='submit' value='" + sample.name + "'></input>";

			//TODO: untested
			button.addEventListener("click", function() {
				replaceUserCode(sample);
			});

			samples.appendChild(button);
		});
	}

	function replaceUserCode(sample) {
		userCode.value = sample.code;
		renderUserCode();
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