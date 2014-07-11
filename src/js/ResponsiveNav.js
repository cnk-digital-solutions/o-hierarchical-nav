/*global require,module*/

var SquishyList = require('o-squishy-list'),
    DomDelegate = require('ftdomdelegate'),
    oViewport = require('o-viewport'),
    Nav = require('./Nav');

function ResponsiveNav(rootEl) {
    "use strict";

    var rootDelegate,
        nav,
        contentFilterEl,
        contentFilter,
        moreEl,
        moreListEl;

    function isMegaDropdownControl(el) {
        return el.hasAttribute('aria-controls');
    }

    function resize() {
        nav.resize();
        if (contentFilter) {
            contentFilter.squish();
            if (!isMegaDropdownControl(moreEl)) {
                populateMoreList(contentFilter.getHiddenItems());
            }
        }
    }

    function emptyMoreList() {
        moreListEl.innerHTML = '';
    }

    function addItemToMoreList(text, href) {
        var itemEl = document.createElement('li'),
            aEl = document.createElement('a');

        if (typeof aEl.textContent !== 'undefined') {
            aEl.textContent = text;
        } else {
            aEl.innerText = text;
        }
        aEl.href = href;
        itemEl.appendChild(aEl);
        moreListEl.appendChild(itemEl);
    }

    function populateMoreList(hiddenEls) {
        emptyMoreList();
        for (var c = 0, l = hiddenEls.length; c < l; c++) {
            var aEl = hiddenEls[c].querySelector('a');
            var ulEl = hiddenEls[c].querySelector('ul');

            var aText = (typeof aEl.textContent !== 'undefined') ? aEl.textContent : aEl.innerText;
            addItemToMoreList(aText, aEl.href, ulEl);
        }
    }

    function setMoreElClass(remainingItems) {
        if (remainingItems === 0) {
            moreEl.classList.add('o-hierarchical-nav__more--all');
            moreEl.classList.remove('o-hierarchical-nav__more--some');
        } else {
            moreEl.classList.add('o-hierarchical-nav__more--some');
            moreEl.classList.remove('o-hierarchical-nav__more--all');
        }
    }

    function contentFilterChangeHandler(ev) {
        if (ev.target === contentFilterEl && ev.detail.hiddenItems.length > 0) {
            nav.collapseAll();
            setMoreElClass(ev.detail.remainingItems.length);
        }
    }

    function navExpandHandler(ev) {
        if (ev.target === moreEl) {
            populateMoreList(contentFilter.getHiddenItems());
        }
    }

    function init() {
        nav = new Nav(rootEl);
        rootDelegate = new DomDelegate(rootEl);
        contentFilterEl = rootEl.querySelector('ul');
        moreEl = rootEl.querySelector('[data-more]');
        if (contentFilterEl) {
            contentFilter = new SquishyList(contentFilterEl, { filterOnResize: false });
        }
        if (moreEl && !isMegaDropdownControl(moreEl)) {
            moreListEl = document.createElement('ul');
            moreListEl.setAttribute('data-o-hierarchical-nav-level', '2');
            moreEl.appendChild(moreListEl);
            rootDelegate.on('oLayers.new', navExpandHandler);
        }

        rootDelegate.on('oSquishyList.change', contentFilterChangeHandler);

        var bodyDelegate = new DomDelegate(document.body);
        // Force a resize when it loads, in case it loads on a smaller screen
        resize();
        
        oViewport.listenTo('resize');
        bodyDelegate.on('oViewport.resize', resize);
    }

    function destroy() {
        rootDelegate.destroy();
    }

    init();

    this.resize = resize;
    this.destroy = destroy;

}

module.exports = ResponsiveNav;