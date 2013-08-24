// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.

window.jdls = window.jdls || {};

// The main user interface.
(function() {
	"use strict";

	var exports = window.jdls.ui = {};
	var preload;
	var error;
	var content;
	var samples;
	var userCode;
	var evaluate;
	var builtins;
	var functions;
	var graph;
	var cm;

	exports.initialize = function initialize(elements) {
		preload = elements.preloadDiv;
		error = elements.errorDiv;
		content = elements.contentDiv;
		samples = elements.samplesList;
		userCode = elements.userCodeDiv;
		evaluate = elements.evaluateButton;
		builtins = elements.showBuiltinsCheckbox;
		functions = elements.showAllFunctionsCheckbox;
		graph = elements.graphDiv;

		exports.cm = cm = new CodeMirror(userCode, {
			mode: 'javascript',
			lineNumbers: true,
			matchBrackets: true,
			autoCloseBrackets: true
		});

		try {
			setUserCode(jdls.usercode.DEFAULT_SAMPLE);
			populateSampleButtons();
			handleEvaluateButton();
			if (!Int32Array) showError();
			else showInterface();
		}
		catch (ex) {
			showError();
		}
	};

	function populateSampleButtons() {
		Object.getOwnPropertyNames(jdls.usercode.samples).forEach(function(name) {
			var sample = jdls.usercode.samples[name];

			failFastIfSampleNameMustBeEscaped(sample.name);
			var li = document.createElement("li");
			li.innerHTML = "<a>" + sample.name + "</a>";
			var button = li.firstChild;

			button.addEventListener("click", function() {
				setUserCode(sample);
			});

			samples.appendChild(li);
		});
	}

	function handleEvaluateButton() {
		evaluate.addEventListener("click", function() {
			renderUserCode();
		});
	}

	function showInterface() {
		preload.style.display = "none";
		error.style.display = "none";
		content.style.display = "block";
		cm.refresh();
	}

	function showError() {
		preload.style.display = "none";
		error.style.display = "block";
		content.style.display = "none";
	}

	function setUserCode(sample) {
		cm.setValue(sample.code);
		// userCode.value = sample.code;
		renderUserCode();
	}

	function getUserCode () {
		return cm.getValue();
	}

	function renderUserCode() {
		try {
			var objectToRender = jdls.usercode.evaluate(getUserCode());
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