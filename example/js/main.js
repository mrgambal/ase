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
	sliderInit: function () {
		var sc = Scripts.Common,
			containers = $('.js-ase');

		if (containers.length) {
			containers.each(function () {
				var el = $(this);
				el.ASE({
					itemsSelector: '.js-ase__item',
					prevCtrl: el.find('.js-ase__nav_prev'),
					nextCtrl: el.find('.js-ase__nav_next'),
					prevClass: 'js-ase__item_prev',
					nextClass: 'js-ase__item_next',
					currentClass: 'js-ase__item_active',
					autoplay: false
				}).addPagination(el.find('.js-ase__pagination'), false, 'i-slider__pagination__item');
			});
		}

		return sc;
	},
	accordionInit: function () {
		var sc = Scripts.Common,
			tabContainer = $('.js-ase-accordion');

		if (tabContainer.length) {
			tabContainer.ASE({
				itemsSelector: '.js-ase-accordion__item',
				prevClass: 'js-ase-accordion__item_prev',
				nextClass: 'js-ase-accordion__item_next',
				currentClass: 'js-ase-accordion__item_active',
				autoplay: false
			}).addPagination('.js-ase-accordion__items-wr', 'js-ase-accordion__item-ln');
		}

		return sc;
	},
	tabsInit: function () {
		var sc = Scripts.Common,
			tabContainer = $('.js-ase-tab');

		if (tabContainer.length) {
			tabContainer.ASE({
				itemsSelector: '.js-ase-tab__item',
				prevClass: 'js-ase-tab__item_prev',
				nextClass: 'js-ase-tab__item_next',
				currentClass: 'js-ase-tab__item_active',
				autoplay: false
			}).addPagination('.js-ase-tab__pagination', 'js-ase-tab__pagination__ln');
		}

		return sc;
	},
    init: function () {
        var sc = this;

        sc.detecting();

        window.onload = function () {
            sc.sliderInit()
	            .accordionInit()
	            .tabsInit()
                .warning();
        };

        return sc;
    }
};

Scripts.Common.init();

function animTypeChanger () {

	$('.js-type-changer-ln').on('click', function () {
		var self = $(this),
			actClass = 'js-type-changer-ln_active',
			slider = self.parent().parent().parent().parent().find('.ase-slider-slice'),
			animType = self.data('js-animtype'),
			container = self.parent().parent(),
			animFamily = container.data('js-animtype-family');

		container.find('.js-type-changer-ln').removeClass(actClass);
		self.addClass(actClass);

		slider.removeClass()
			.addClass(animType)
			.addClass('element element_slider ase-slider-slice js-ase ' + animFamily);
	});

}

$(document).ready(function() {
	$('.js-type-changer').each( function () {
		animTypeChanger ();
	});
});