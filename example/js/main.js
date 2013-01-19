;
var Scripts = Scripts || {};

Scripts.Common = {
    detecting: function () {
        $('html').removeClass('no-js');
    },
    warning: function () {
        var sc = Scripts.Common,
            warning = $('.warning'),
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

        return sc;
    },
    rotateSlider: function () {
        var sc = Scripts.Common,
            containers = $('.js-marquee');

        if (containers.length)
            containers.each(function () {
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

        return sc;
    },
    animTypeChanger: function () {
        var sc = Scripts.Common;

        $('.js-type-changer').on('click', function () {
            var actClass = 'js-type-changer_active',
                slider = $('.css-slider');

            $('.js-type-changer').removeClass(actClass);
            $(this).addClass(actClass);

            slider.removeClass('anim-type-1 anim-type-2 anim-type-3 anim-type-4 anim-type-5 anim-type-6 anim-type-7 anim-type-8 anim-type-9 anim-type-10');
            slider.addClass($(this).data('js-animtype'));
        });

        return sc;
    },
    init: function () {
        var sc = this;

        sc.detecting();

        window.onload = function () {
            sc.rotateSlider()
                .warning()
                .animTypeChanger();
        };

        return sc;
    }
};

Scripts.Common.init();
