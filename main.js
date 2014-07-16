/*global require,module*/
var oHierarchicalNav = require('./src/js/ResponsiveNav');
var constructAll = function() {
	'use strict';
	oHierarchicalNav.prototype.createAllIn(document.body);
	document.removeEventListener('o.DOMContentLoaded', constructAll);
}
document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = oHierarchicalNav;
