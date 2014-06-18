/*global require*/

var ResponsiveNav = require('../../main.js'),
    navEls = document.querySelectorAll('.o-hierarchical-nav');

for (var c = 0, l = navEls.length; c < l; c++) {
    new ResponsiveNav(navEls[c]);
}