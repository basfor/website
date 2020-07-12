; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function () {
		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	var burgerMenu = function () {
		$('.js-colorlib-nav-toggle').on('click', function (event) {
			event.preventDefault();
			var $this = $(this);
			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');
			}
		});
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function () {
		$(document).click(function (e) {
			var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('offcanvas');
					$('.js-colorlib-nav-toggle').removeClass('active');
				}
			}
		});
		$(window).scroll(function () {
			if ($('body').hasClass('offcanvas')) {

				$('body').removeClass('offcanvas');
				$('.js-colorlib-nav-toggle').removeClass('active');
			}
		});
	};

	var clickMenu = function () {
		$('#navbar a:not([class="external"])').click(function (event) {
			var section = $(this).data('nav-section'),
			navbar = $('#navbar');
			if ($('[data-section="' + section + '"]').length) {
				$('html, body').animate({
					scrollTop: $('[data-section="' + section + '"]').offset().top - 55
				}, 500);
			}
			if (navbar.is(':visible')) {
				navbar.removeClass('in');
				navbar.attr('aria-expanded', 'false');
				$('.js-colorlib-nav-toggle').removeClass('active');
			}
			event.preventDefault();
			return false;
		});
	};

	// Reflect scrolling in navigation
	var navActive = function (section) {
		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function () {
			$(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
		});
	};

	var sliderMain = function () {
		$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}
		});
	};

	var setGallery = function () {
		var elements = document.getElementsByClassName("grid");
		for (var index = 0; index < elements.length; index++) {
			const gridify = new Gridify();

			var container = elements[index];
			container.addEventListener('gridify:init', (ev) => {
				console.log('Init handler');
			}, false);
			container.addEventListener('gridify:resized', (ev) => {
				console.log('Resized handler');
			}, false);
		};
	};

	// Document on load.
	$(function () {
		fullHeight();
		burgerMenu();
		clickMenu();
		mobileMenuOutsideClick();
		sliderMain();
		setGallery();
	});
}());

$(document).ready(function () {
	$('.zoom-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function (item) {
				return item.el.attr('title');
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}
	});
});