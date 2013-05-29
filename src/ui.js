// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// The main user interface.
(function() {
	"use strict";

	var exports = window.jdls.ui = {};
	var samples;
	var userCode;
	var evaluate;
	var builtins;
	var graph;

	exports.initialize = function initialize(elements) {
		samples = elements.samplesList;
		userCode = elements.userCodeTextArea;
		evaluate = elements.evaluateButton;
		builtins = elements.showBuiltinsCheckbox;
		graph = elements.graphDiv;

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
			var li = document.createElement("li");
			li.innerHTML = "<input type='submit' value='" + sample.name + "'></input>";
			var button = li.firstChild;

			//TODO: untested
			button.addEventListener("click", function() {
				replaceUserCode(sample);
			});

			samples.appendChild(li);
		});
	}

	function replaceUserCode(sample) {
		userCode.value = sample.code;
		renderUserCode();
	}

	function renderUserCode() {
		try {
			var objectToRender = jdls.usercode.evaluate(userCode.value);
			var options = {
				builtins: builtins.checked,
				allFunctions: false
			};

			graph.innerHTML = jdls.viz.render("this", objectToRender, options);
		}
		catch(err) {
			graph.innerHTML = inspect(err.toString());
		}
	}

	function inspect(string) {
   return "<pre>" + string.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;") + "</pre>";
 }

}());