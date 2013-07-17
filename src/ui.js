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
	var functions;
	var graph;

	exports.initialize = function initialize(elements) {
		samples = elements.samplesList;
		userCode = elements.userCodeTextArea;
		evaluate = elements.evaluateButton;
		builtins = elements.showBuiltinsCheckbox;
		functions = elements.showAllFunctionsCheckbox;
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

			failFastIfSampleNameMustBeEscaped(sample.name);
			var li = document.createElement("li");
			li.innerHTML = "<a>" + sample.name + "</a>";
			var button = li.firstChild;

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
				allFunctions: functions.checked
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

	function failFastIfSampleNameMustBeEscaped(name) {
		if (contains(["<", ">", '"', "&"])) throw new Error("Sample name [" + name + "] includes text that must be HTML-escaped; that's not implemented yet.");

		function contains(forbiddenChars) {
			return forbiddenChars.some(function(char) {
				return name.indexOf(char) !== -1;
			});
		}
	}

}());