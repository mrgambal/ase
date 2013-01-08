;
var Scripts = Scripts || {};

Scripts.Common = {
    detecting: function () {
        $('html').removeClass('no-js');
    },
    warning: function () {

        var warning = $('.warning'),
            warnHide = function () {
                warning.fadeOut(800);
            },
            timeoutId = setTimeout(function () {
                warnHide();
            }, 2000);

        warning.data('timeoutId', timeoutId);

        warning.mouseenter(function () {
            clearTimeout($(this).data('timeoutId'));
        }).mouseleave(function () {
                warnHide();
            });
    },
    rotateSlider: function () {
        var x = $('.js-marquee');

        if (x.length)
            x.each(function () {
                var el = $(this);
                el.ASE({
                    autoplay: true,
                    prevCtrl: el.find('.js-marquee__nav_prev'),
                    nextCtrl: el.find('.js-marquee__nav_next'),
                    swipeCtrl: el.find('.js-marquee__pane'),
                    onMove: function () {
                        console.log('Slider #' + this.__indexInArray + ' - Slide#' + this.__curIndex);
                    }
                }).addPagination(el.find('.js-marquee__pagination'));
            });
    },
    tabSlider: function () {
        var x = $('.js-tab');

        if (x.length)
            x.ASE({
                itemsSelector: '.js-tab__item',
                autoplay: true,
                prevCtrl: x.find('.js-tab__nav_prev'),
                nextCtrl: x.find('.js-tab__nav_next'),
                swipeCtrl: x.find('.js-tab__pane'),
                nextClass: 'js-tab__item_next',
                currentClass: 'js-tab__item_active',
                prevClass: 'js-tab__item_prev',
                onMove: function () {
                    console.log('Slider #' + this.__indexInArray + '. i am tab after move function');
                }
            }).addPagination(x, 'js-marquee__pagination');
    },
    animTypeChanger: function () {
        $('.js-type-changer').on('click', function () {
            var actClass = 'js-type-changer_active',
                slider = $('.css-slider');

            $('.js-type-changer').removeClass(actClass);
            $(this).addClass(actClass);

            slider.removeClass('anim-type-1 anim-type-2 anim-type-3 anim-type-4 anim-type-5 anim-type-6 anim-type-7 anim-type-8 anim-type-9 anim-type-10');
            slider.addClass($(this).data('js-animtype'));
        });
    },
    init: function () {
        var sc = this;

        sc.detecting();

        window.onload = function () {
            sc.rotateSlider();
            sc.tabSlider();
            sc.warning();
            sc.animTypeChanger();
        };

        return sc;
    }
};

Scripts.Common.init();
