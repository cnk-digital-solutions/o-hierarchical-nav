/*global require,module*/
function HierarchicalNav(rootEl) {
	'use strict';

	function init() {
		if (rootEl.getAttribute('data-o-hierarchical-nav-orientiation') === 'vertical') {
			var Nav = require('./src/js/Nav');
			new Nav(rootEl);
		} else {
			var ResponsiveNav = require('./src/js/ResponsiveNav');
			new ResponsiveNav(rootEl);
		}
	}

	init();
}

module.exports = HierarchicalNav;
