(function () {
	'use strict';

	var nxt = window.nxt || {};

	nxt.Eval = function (fn) {
		return fn();
	};

	nxt.Classes = function (classes) {
		return classes
			.split(' ')
			.map(function (className) { return nxt.Class(className); });
	};

	nxt.Fragment = function () {
		if (!arguments.length) {
			return [];
		}
		return [].slice.call(arguments);
	};

	nxt.If = function () {
		var condition = arguments[0];
		var commands = [].slice.call(arguments, 1);
		if (condition) {
			if (commands.length > 1) {
				return commands;
			} else {
				return commands[0];
			}
		}
	};

})();
