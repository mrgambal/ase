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

			containers.data('ASEngine').init({ // FIXME call some event before goPrev
				onMove: function () {

					console.log('Slide #' + this.index + '. onMove');

				}
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
			cacrousel = $('.js-ase-carousel');

		if (cacrousel.length) {
			cacrousel.ASE({
				itemsSelector:'.js-ase-carousel__item',
				prevCtrl:cacrousel.find('.js-ase-carousel__nav_prev'),
				nextCtrl:cacrousel.find('.js-ase-carousel__nav_next'),
				prevClass:'js-ase-carousel__item_prev',
				nextClass:'js-ase-carousel__item_next',
				currentClass:'js-ase-carousel__item_active',
				autoplay:false,
				onMove:function () {
					cacrousel.find('.js-ase-carousel__item').removeClass('js-ase-carousel__item_active_to-prev js-ase-carousel__item_active_to-next');
					menuLne(cacrousel.find('.js-ase-carousel__pagination__ln_active'));
				},
				onPrev:function () {
					setTimeout(function () {
						cacrousel.find('.js-ase-carousel__item_active').addClass('js-ase-carousel__item_active_to-prev');
					}, 1);
				},
				onNext:function () {
					setTimeout(function () {
						cacrousel.find('.js-ase-carousel__item_active').addClass('js-ase-carousel__item_active_to-next');
					}, 1);
				}
			}).addPagination('.js-ase-carousel__pagination', 'js-ase-carousel__pagination__ln');

			// menu line initial state

			$('.js-menu-line-container').append('<li class="js-menu-line"></li>');

			var activeEl = $('.js-ase-carousel__pagination__ln_active'),
				line = $('.js-menu-line'),
				initLeft = activeEl.position().left,
				initWidth = activeEl.width();

			line.css('width', initWidth).css('left', initLeft);

			// menu line on change behaviour

			function menuLne (el) {
				var line = $('.js-menu-line'),
					newLeft = el.position().left,
					newWidth = el.width();

				line.css('width', newWidth).css('left', newLeft);
			}
		}

		return sc;
	},
	scrollSliderInit : function() {
		var sc = Scripts.Common,
			container = $('.js-ase-carousel-scroll'),
			ase,
			scrollbar = $('#js-ui-slider-controls');

		if (container.length) {
			container.ASE({
				itemsSelector:'.js-ase__item',
				prevCtrl:container.find('.js-ase__nav_prev'),
				nextCtrl:container.find('.js-ase__nav_next'),
				prevClass:'js-ase__item_prev',
				nextClass:'js-ase__item_next',
				currentClass:'js-ase__item_active',
				autoplay:false
			});

			ase = container.data('ASEngine');

			// init scrollbar

			scrollbar.slider({
				min: 0,
				max: ase.items.length - 1,
				value: ase.__curIndex,

				slide: function(event, ui) {
					ase.goTo(ui.value);
				}
			});

			scrollbar.find( ".ui-slider-handle" ).wrap( "<div class='ui-handle-helper-parent'></div>" );

			// change scrollbar position

			ase.init({
				onMove: function () {
					$('#js-ui-slider-controls').slider({
						value: ase.__curIndex
					});
				}
			});
		}

		return sc;
	},
	sliceInit:function () {
		var sc = Scripts.Common,
			containers = $('.js-ase-slice');

		if (containers.length) {
			containers.each(function () {
				var slider = $(this);
				slider.ASE({
					itemsSelector:'.js-ase-slice__item',
					prevCtrl:slider.find('.js-ase__nav_prev'),
					nextCtrl:slider.find('.js-ase__nav_next'),
					prevClass:'js-ase-slice__item_prev',
					nextClass:'js-ase-slice__item_next',
					currentClass:'js-ase-slice__item_active',
					autoplay:false
				}).addPagination(slider.find('.js-ase__pagination'), false, 'i-slider__pagination__item');
			});
		}

		return sc;
	},
	complexSlider:function () {
		var sc = Scripts.Common,
			containers = $('.js-ase-complex');

		if (containers.length) {
			containers.each(function () {
				var el = $(this);
				el.ASE({
					itemsSelector:'.js-ase-complex__item',
					prevCtrl:el.find('.js-ase-complex__nav_prev'),
					nextCtrl:el.find('.js-ase-complex__nav_next'),
					prevClass:'js-ase-complex__item_prev',
					nextClass:'js-ase-complex__item_next',
					currentClass:'js-ase-complex__item_active',
					autoplay:false
				}).addPagination(el.find('.js-ase__pagination'), false, 'i-slider__pagination__item');
			});
		}

		return sc;
	},
	init:function () {
		var sc = this;

		sc.detecting();

		window.onload = function () {
			sc.sliderInit()
				.accordionInit()
				.tabsInit()
				.carouselInit()
				.sliceInit()
				.complexSlider()
				.warning()
				.animTypeChanger();

			sc.scrollSliderInit();
		};

		return sc;
	}
};

Scripts.Common.init();