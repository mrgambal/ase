;
var Scripts = Scripts || {};

Scripts.Common = {
	detecting:function () {
		$('html').removeClass('no-js');
	},
	warning:function () {
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
	sliderInit:function () {
		var sc = Scripts.Common,
			containers = $('.js-ase');

		if (containers.length) {
			containers.each(function () {
				var el = $(this);
				el.ASE({
					itemsSelector:'.js-ase__item',
					prevCtrl:el.find('.js-ase__nav_prev'),
					nextCtrl:el.find('.js-ase__nav_next'),
					prevClass:'js-ase__item_prev',
					nextClass:'js-ase__item_next',
					currentClass:'js-ase__item_active',
					autoplay:false
				}).addPagination(el.find('.js-ase__pagination'), false, 'i-slider__pagination__item');
			});
		}

		return sc;
	},
	accordionInit:function () {
		var sc = Scripts.Common,
			accordContainer = $('.js-ase-accordion');

		if (accordContainer.length) {
			accordContainer.ASE({
				itemsSelector:'.js-ase-accordion__item',
				prevClass:'js-ase-accordion__item_prev',
				nextClass:'js-ase-accordion__item_next',
				currentClass:'js-ase-accordion__item_active',
				autoplay:false
			}).addPagination('.js-ase-accordion__items-wr', 'js-ase-accordion__item-ln');
		}

		$('.js-ase-accordion__item-ln_active').on('click', function () {
			$(this).parent().parent().removeClass('js-ase-accordion__item_active'); //FIXME
		});

		return sc;
	},
	tabsInit:function () {
		var sc = Scripts.Common,
			tabContainers = $('.js-ase-tab');

		if (tabContainers.length) {
			tabContainers.each(function () {
				var el = $(this);
				el.ASE({
					itemsSelector:'.js-ase-tab__item',
					prevClass:'js-ase-tab__item_prev',
					nextClass:'js-ase-tab__item_next',
					currentClass:'js-ase-tab__item_active',
					autoplay:false
				}).addPagination(el.find('.js-ase-tab__pagination'), 'js-ase-tab__pagination__ln');
			});
		}

		return sc;
	},
	carouselInit:function () {
		var sc = Scripts.Common,
			containers = $('.js-ase-carousel');

		if (containers.length) {
			containers.each(function () {
				var el = $(this);
				el.ASE({
					itemsSelector:'.js-ase-carousel__item',
					prevCtrl:el.find('.js-ase-carousel__nav_prev'),
					nextCtrl:el.find('.js-ase-carousel__nav_next'),
					prevClass:'js-ase-carousel__item_prev',
					nextClass:'js-ase-carousel__item_next',
					currentClass:'js-ase-carousel__item_active',
					autoplay:false,
					onMove:function () {
						el.find('.js-ase-carousel__item_prev').removeClass('js-ase-carousel__item_active_to-prev js-ase-carousel__item_active_to-next');
						el.find('.js-ase-carousel__item_next').removeClass('js-ase-carousel__item_active_to-prev js-ase-carousel__item_active_to-next');
						menuLne(el.find('.js-ase-carousel__pagination__ln_active'));
					},
					onPrev:function () {
						setTimeout(function () {
							el.find('.js-ase-carousel__item_active').addClass('js-ase-carousel__item_active_to-prev');
						}, 1);
					},
					onNext:function () {
						setTimeout(function () {
							el.find('.js-ase-carousel__item_active').addClass('js-ase-carousel__item_active_to-next');
						}, 1);
					}
				}).addPagination('.js-ase-carousel__pagination', 'js-ase-carousel__pagination__ln');
			});

			// menu line initial state

			$('.js-menu-line-container').append('<li class="js-menu-line"></li>');

			var activeEl = $('.js-ase-carousel__pagination__ln_active'),
				line = $('.js-menu-line'),
				initLeft = activeEl.position().left,
				initWidth = activeEl.width();

			line.css('width', initWidth).css('left', initLeft);

			// menu line on change

			function menuLne (el) {
				var line = $('.js-menu-line'),
					newLeft = el.position().left,
					newWidth = el.width();

				line.css('width', newWidth).css('left', newLeft);
			}
		}

		return sc;
	},
	animTypeChanger:function () {

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

	},
	init:function () {
		var sc = this;

		sc.detecting();

		window.onload = function () {
			sc.sliderInit()
				.accordionInit()
				.tabsInit()
				.carouselInit()
				.warning()
				.animTypeChanger()
		};

		return sc;
	}
};

Scripts.Common.init();