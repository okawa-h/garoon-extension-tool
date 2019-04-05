(function(window) {

	var HOSTNAME   = window.location.hostname;
	var RUNTIME_ID = chrome.runtime.id;
	var _$body;

	document.addEventListener('DOMContentLoaded',init);

	function init() {

		_$body = document.getElementById('body');
		setScheduleBackground();

	}

	/* =======================================================================
		Set Schedule Background
	========================================================================== */
	function setScheduleBackground() {

		if (!_$body) return;

		function setBackgroundColor() {

			var $targetList = _$body.querySelectorAll('p,a');

			for (var i = 0; i < $targetList.length; i++) {

				var $target   = $targetList[i];
				var $spanList = $target.querySelectorAll('span');

				if ($spanList.length <= 0) continue;
				var $span     = $spanList[0];
				var className = $span.getAttribute('class');
				if (className && -1 < className.indexOf('event_')) {

					var color = document.defaultView.getComputedStyle($span,null).backgroundColor;
					var rgb   = color.substring(4, color.length - 1).replace(/ /g, '').split(',');

					var $parents = getParents($target,'.group_week_calendar_item');
					if ($parents.length <= 0) $parents = getParents($target,'.personalMonth_calendar_item');

					if (0 < $parents.length) {
						$parents[0].style.backgroundColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',.2)';
						$parents[0].style.padding = '5px';
					}

				}

			}

		}

		_$body.addEventListener('DOMSubtreeModified',setBackgroundColor,false);
		_$body.addEventListener('propertychange',setBackgroundColor,false);
		setBackgroundColor();

	}

	var getParents = function (elem, selector) {

		if (!Element.prototype.matches) {
			Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
		}

		var parents = [];

		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if (selector) {
				if (elem.matches(selector)) {
					parents.push(elem);
				}
				continue;
			}
			parents.push(elem);
		}

		return parents;

	};

})(window);
