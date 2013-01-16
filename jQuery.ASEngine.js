/* ------------------------------------------------------------------------
 Aura Slider Engine ( https://github.com/selfnamed/ase/ )

 Simple, lightweight and flexible slider engine based on css animation abilities.
 Destination of this slider (and it major advantage) - just to change classes
 on items inside container. You could use all awailable css-powers to realize
 slider-effect of your dreams.

 Authors: JS-jedi: Dmitry Gambal (http://github.com/selfnamed)
          CSS-jedi: Dmitry Nechepurenko (https://github.com/dimanech)

 Inspired By: My Friend Dmitry Nechepurenko and some existing solutions

 Dependencies: jQuery >= 1.7.2
               jQuery Mobile (if you want to handle swipe events on mobile devices)

 Version: 0.6a

 Copyright: Feel free to redistribute the script/modify it, as
 long as you leave my info at the top.

 ------------------------------------------------------------------------- */
;
(function ($) {
    /*
     @param {Object} opts Options
     @param {function} container jQuery-wrapped container
     */
    function ASEngine(opts, container) {
        this.init(opts, container);
    }

    ASEngine.prototype = {
        __container: null,
        __current: null,
        __curIndex: null,
        __eventNS: '.ASEngine',
        __indexInArray: 0,
        __pgnClass: 'js-marquee__pagination__item',
        __pgnContainer: null,
        __timerID: 0,

        items: null,
        options: {},
        defaultOptions: {
            itemsSelector: '.js-marquee__item',
            prevCtrl: null,
            nextCtrl: null,
            swipeCtrl: null,

            nextClass: 'js-marquee__item_next',
            currentClass: 'js-marquee__item_active',
            prevClass: 'js-marquee__item_prev',

            onMove: function () {},
            onNext: function () {},
            onPrev: function () {},

            autoplay: false,
            autoplayDelay: 15000
        },
        __addEventHandlers: function () {
            var _s = this,
                _so = _s.options,
                hasHref = function (el) {
                    var href = el.href || (el.attributes.hasOwnProperty('data-href') ? el.attributes['data-href'].value : '');
                    return (href !== "" & (href != location.href & href.indexOf(location.href + '#') < 0));
                },
                _p = function (e) {
                    if (hasHref(this))
                        return;

                    e.preventDefault();
                    _s.goPrev.call(_s, true);
                },
                _n = function (e) {
                    if (hasHref(this))
                        return;

                    e.preventDefault();
                    _s.goNext.call(_s, true);
                };

            // previous
            if (_so.prevCtrl && _so.prevCtrl.length)
                _so.prevCtrl.on('click' + _s.__eventNS, _p);
            // next
            if (_so.nextCtrl && _so.nextCtrl.length)
                _so.nextCtrl.on('click' + _s.__eventNS, _n);
            // autoplay
            if (_so.autoplay) {
                if (_s.__timerID)
                    clearInterval(_s.__timerID);
                _s.setAutoplay();
            }
            // swipes on mobile devices
            if (_so.swipeCtrl && _so.swipeCtrl.length) {
                _so.swipeCtrl.on('swipeleft' + _s.__eventNS, _n)
                    .on('swiperight' + _s.__eventNS, _p);
            }
            // hover on container
            _s.__container
                .on('mouseenter' + _s.__eventNS, function () {
                    if (_s.__timerID)
                        clearInterval(_s.__timerID);
                })
                .on('mouseleave' + _s.__eventNS, function () {
                    if (_so.autoplay)
                        _s.setAutoplay.call(_s);
                });

            return _s;
        },
        __changePaginationLink: function (nextIndex, prevIndex) {
            var _s = this,
                actClass = _s.__pgnClass + '_active';

            nextIndex++;
            prevIndex++;

            _s.__pgnContainer
                .find('.' + actClass)
                .removeClass(actClass);
            _s.__pgnContainer
                .removeClass(_s.__pgnClass + '_p' + prevIndex)
                .addClass(_s.__pgnClass + '_p' + nextIndex)
                .find('a[data-href=#' + nextIndex + ']')[0]
                .className += ' ' + actClass;

            return _s;
        },
        __nextIndex: function (itemIndex, dontChange) {
            var _s = this;
            // next index calculation
            if (itemIndex === _s.__curIndex)
                return 0;
            if (itemIndex > _s.items.length - 1) {
                if (!dontChange)
                    _s.__curIndex = -1;

                itemIndex = 0;
            } else if (itemIndex < 0) {
                if (!dontChange)
                    _s.__curIndex = _s.items.length;

                itemIndex = _s.items.length - 1;
            }

            return itemIndex;
        },
        __removeEventHandlers: function () {
            var _s = this,
                _so = _s.options;

            if (_so.prevCtrl && _so.prevCtrl.length)
                _so.prevCtrl.off(_s.__eventNS);
            if (_so.nextCtrl && _so.nextCtrl.length)
                _so.nextCtrl.off(_s.__eventNS);
            if (_so.swipeCtrl && _so.swipeCtrl.length)
                _so.swipeCtrl.off(_s.__eventNS);
            if (_s.__pgnContainer)
                _s.__pgnContainer.find('.' + _s.__pgnClass).off(_s.__eventNS);
            _s.__container.off(_s.__eventNS);

            return _s;
        },
        addPagination: function (container, pgnClass, addClass) {
            if (!container.hasOwnProperty("selector"))
                container = $(container);
            if (!container.length)
                return false;

            var _s = this,
                _h = function (e) {
                    var nextIndex = this.attributes['data-href'].value.substr(this.attributes['data-href'].value.indexOf('#') + 1) - 1;

                    e.preventDefault();
                    _s.goTo(nextIndex, true);
                };

            if (pgnClass && pgnClass.length)
                _s.__pgnClass = pgnClass;
            if (!container.find('.' + _s.__pgnClass).length)
                for (var i = 0; i++ < _s.items.length;)
                    container[0].innerHTML += (i === _s.__curIndex + 1)
                        ? ["<a data-href='#", i, "' class='", _s.__pgnClass, " ", (_s.__pgnClass + '_active'), " ", (addClass || ''), "'>", "</a>"].join("")
                        : ["<a data-href='#", i, "' class='", _s.__pgnClass, " ", (addClass || ''), "'>", "</a>"].join("");

            container[0].className += " " + _s.__pgnClass + "_p" + (_s.__curIndex + 1);
            _s.__pgnContainer = container.on('click' + _s.__eventNS, "." + _s.__pgnClass, _h);

            return _s;
        },
        goNext: function (stopAutoplay) {
            if (typeof this.options.onNext === 'function')
                this.options.onNext.call(this);

            return this.goTo(this.__curIndex + 1, stopAutoplay);
        },
        goPrev: function (stopAutoplay) {
            if (typeof this.options.onPrev === 'function')
                this.options.onPrev.call(this);

            return this.goTo(this.__curIndex - 1, stopAutoplay);
        },
        goTo: function (itemIndex, stopAutoplay) {
            if (itemIndex == this.__curIndex) return this;

            var _s = this,
                _so = _s.options,
                goBack = false,
                nextIndex = 0,
                prevIndex = _s.__curIndex;

            itemIndex = _s.__nextIndex(itemIndex);
            goBack = itemIndex < _s.__curIndex;
            nextIndex = _s.__nextIndex((goBack ? itemIndex - 1 : itemIndex + 1), true);
            // pagination links update
            if (_s.__pgnContainer)
                _s.__changePaginationLink(itemIndex, prevIndex);
            // disable autoplay
            if (stopAutoplay && _s.__timerID)
                clearInterval(_s.__timerID);
            // call onMove
            if (typeof _so.onMove === 'function')
                _so.onMove.call(this);

            _s.items
                .removeClass(_so.prevClass + " " + _so.nextClass)
                .eq(itemIndex)
                .addClass(goBack ? _so.prevClass : _so.nextClass);
            _s.__current
                .removeClass(_so.currentClass)
                .addClass(goBack ? _so.nextClass : _so.prevClass);
            _s.__current = _s.items.eq(itemIndex)
                .removeClass(goBack ? _so.prevClass : _so.nextClass)
                .addClass(_so.currentClass);
            _s.items
                .eq(nextIndex)
                .addClass(goBack ? _so.prevClass : _so.nextClass);
            _s.__curIndex = itemIndex;

            return _s;
        },
        setAutoplay: function () {
            var _s = this;

            _s.__timerID = setInterval(function () {
                _s.goNext(false);
            }, _s.options.autoplayDelay);

            return _s;
        },
        init: function (opts, container) {
            var _s = this;
            // apply passed options
            _s.options = $.extend({}, _s.defaultOptions, opts);
            _s.items = (_s.__container = container).find(_s.options.itemsSelector);

            if (_s.items.length < 3)
                return false;

            _s.__current = _s.items.first().addClass(_s.options.currentClass);
            _s.items[1].className += ' ' + _s.options.nextClass;
            _s.items[_s.items.length - 1].className += ' ' + _s.options.prevClass;

            _s.__curIndex = 0;
            _s.__removeEventHandlers()
                .__addEventHandlers();

            return _s;
        }
    };

    $.fn.ASE = function (opts) {
        var _s = new ASEngine(opts, this);

        _s.__indexInArray = (window.ASESliders = window.ASESliders || []).push(_s) - 1;
        this.data('ASEngine', _s);

        return _s;
    };
})(jQuery);
