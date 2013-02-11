Aura Slider Engine
==================

>Simple, lightweight and flexible slider engine based on css animation abilities. Destination of this slider (and it major advantage) - just to change classes on items inside container. You could use all awailable css-powers to realize slider-effect of your dreams.

Authors:
-------
* JS-jedi: Dmitry Gambal (https://github.com/mrgambal)
* CSS-jedi: Dmitry Nechepurenko (https://github.com/dimanech)

Inspired By:
------------
My friend Dmitry Nechepurenko and some existing solutions

Dependencies:
-------------
* [jQuery][jquery] >= 1.7.2
* [jQuery Mobile][jquery-m] (if you want to handle swipe events on mobile devices)

Version:
--------
 0.7a

Copyright:
----------
 	Feel free to redistribute the script/modify it, as long as you leave my info at the top.

Manual
------

###1. Including###

ASE is not a slider as is - it's just a jQuery-based engine to make it as you wish. But if you don't want to trouble yourself with CSS-animations we'll provide so many examples as we can until get bored.
Before you'll put ASE into webpage you should assert that all dependencies specified above are resolved. For example:

    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript" charset="utf-8"></script>
    <!-- jQuery Mobile is optional -->
    <script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js" type="text/javascript" charset="utf-8"></script>

... and ASE itself:

    <script src="js/jQuery.ASEngine.js" type="text/javascript" charset="utf-8"></script>

###2. First steps###

Minimal pre-configuration set is some html-container (div, p, span... whatever) and at least 3 slides (tag-independent too) inside it.
If your container has class *js-slider-container* and slides have class *js-slider-item* easiest case to initialize ASE looks like this:

```js
 $('.js-slider__container').ASE({itemsSelector: '.js-slider__item'});
```

###3. Controls###

If you want to specify prev, next or swipe controls - just declare them into ASE-init options as jQuery-selected objects:

```js
 $('.js-slider__container').ASE({
 	itemsSelector: '.js-slider__item',
    prevCtrl: $('.js-slider__prevcontrol'), // control to show prev slide
    nextCtrl: $('.js-slider__nextcontrol'), // control to show next slide
    swipeCtrl: $('.js-slider__swipecontrol') // control to handle swipes
 });
```

**IMPORTANT**: for swipe and tap events handling you should previously include any JS-library that provide needed abilities e.g. [jQuery Mobile][jquery-m].

###4. Autoslide###

One more useful feature you can use 'from-the-scratch' is auto-slide. To enable it you just need to add only 1 string to your existing code:

```js
 $('.js-slider__container').ASE({
 	itemsSelector: '.js-slider__item',
    prevCtrl: $('.js-slider__prevcontrol'),
    nextCtrl: $('.js-slider__nextcontrol'),
    swipeCtrl: $('.js-slider__swipecontrol'),
    autoplay: true // enable autoplay
 });
```

And that's all. Every 15 seconds (by default settings) your slides are changing automatically.
But if you want to specify own changing time value - simply add one more string:

```js
 $('.js-slider-container').ASE({
 	itemsSelector: '.js-slider__item',
    prevCtrl: $('.js-slider__prevcontrol'),
    nextCtrl: $('.js-slider__nextcontrol'),
    swipeCtrl: $('.js-slider__swipecontrol'),
    autoplay: true,
    autoplayDelay: 10000 // time in milliseconds
 });
```

###5. Callbacks###

Often, in my web-developers practice, i've faced with a lack of functions, that would be called up at some event in the slider. By this reason basic set of event-callbacks was implemented in ASE. They would be declared in init-options as keys 'onMove', 'onNext' and/or 'onPrev'. That is how it looks like:

```js
 $('.js-slider-container').ASE({
 	itemsSelector: '.js-slider__item',
    prevCtrl: $('.js-slider__prevcontrol'),
    nextCtrl: $('.js-slider__nextcontrol'),
    swipeCtrl: $('.js-slider__swipecontrol'),
    autoplay: true,
    autoplayDelay: 10000,
    onMove: function () {
        console.log('Slide #' + this.__curIndex + '. onMove');
    },
    onPrev: function () {
        console.log('Slide #' + this.__curIndex + '. onPrev');
    },
    onNext: function () {
        console.log('Slide #' + this.__curIndex + '. onNext');
    }
 });
```

**IMPORTANT:** As you can see, context (*this*) in those callbacks is current ASE-instance. Yes, you can change some settings or even override some functionality inside them, but it is strongly recommended to do that only if you fully understand what and why you want to do.

###6. After-init access###

Access to previously initialized ASE-instance available via 2 different ways (both results are equal). All declared ASESliders will be added into array named ASESliders one by one and can be accessed diretly from there. Another way is to receive it via jQuery.data() method applied to slider-container, with string 'ASEngine' passed as parameter:

```js
window.ASESliders[0]
//ASEngine

$('.js-slider__container').data('ASEngine')
//ASEngine

$('.js-slider__container').data('ASEngine') === window.ASESliders[0]
//true
```

###7. Pagination###

Aura Slider Engine has a built-in pagination handler/generator. It should be called via *.addPagination()* method applied to slider container that was received as described above. Method can receive 3 parameters

	1. [jQuery-object | string] container - jQuery-selected container for pagination controls or selector for that container;
	2. [string | bool]          pgnClass  - class for pagination controls explicitly declared in your HTML-markup inside container specified by first parameter. Default value - 'js-ase__pagination';
	3. [string]                 addClass  - class that will be added to pagination controls, only if they will be generated automatically. Default value - null.

Default class for active pagination link is pagination-item-class + '_active'.

**IMPORTANT:** If you'll try to bind pagination with existing controls - don't forget to add *data-href*-attribute to them. Value must be hash-tag with number of slide (count starts from 1). E.g.:

    <a href="#" data-href="#1" class="js-tab-ln">Tab 1</a>

Let's see how it can be used:

```js
var sl = $('.js-slider__container').data('ASEngine');

// 1. Pagination will be added into container with class 'js-slider__pagination-container'
// to controls with class 'js-slider__pagination-container' (default value) if they're exists.
// If not - these links will be generated.
sl.addPagination('.js-slider__pagination-container');
// or
sl.addPagination($('.js-slider__pagination-container'));

// 2. Generating links with specified class (container is empty)
sl.addPagination('.js-slider__pagination-container', 'js-slider__pagination-container__ln');

// 3. Generating links with two specified classes (container is empty)
sl.addPagination('.js-slider__pagination-container', 'js-slider__pagination-container__ln', 'another-class-to-ln yet-another-class-to-ln');

// 4. Binding to existing controls have class 'js-tabnav__ln' (links already in container). If links with specified class wasn`t found - they'll be generated.
sl.addPagination('.js-tabnav', 'js-tabnav__ln');
```

###8. Reinit###

In case if you need to change something in slider behavior on-the-fly e.g. set new autoplay delay time, you can use *init(options, container)* method.
This metod receives two arguments:

    1. [JS-object]              options               - JavaScript-object with same options like in initialization example;
    2. [jQuery-object | string] container (redundant) -  jQuery-selected container for pagination controls or selector for that container;

**NOTICE:** second parameter was redundant. If passed - existing container wouldn't to be overridden.
See example below:

```js
// taking container with existing slider
var sl = $('.js-slider');

// set new autoplay delay and new onMove callback
sl.data('ASEngine').init({
                    autoplayDelay: 1000,
                    onMove: function () {console.log('Reinited Slider #' + this.__indexInArray + ' - Slide#' + this.__curIndex);}
                });
```

##Resume##

My goal is to create simple and very flexible lightweight slider engine that can make life of web-developers a little bit easier. ASE doesn't declare requirements to your HTML-markup and don't bring own CSS.
But (as mentioned above) you can use it without specially knowledges in HTML and CSS with our examples.
If you liked ASE, you can contribute, share links, write blog-posts, tell your mommy about it, make a tatoo 'I luv ASE', whatever...
Enjoy!

[jquery]: http://jquery.com/ "jQuery page"
[jquery-m]: http://jquerymobile.com/ "jQuery-Mobile page"
