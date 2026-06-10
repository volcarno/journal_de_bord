/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});

		// --- CONFIGURATION DU SLIDER FOOTER ---
	var imagesDisponibles = [
		"/images/santiaguito/01.jpg", "/images/santiaguito/05.jpg", 
		"/images/santiaguito/10.jpg", "/images/santiaguito/18.jpg",
		"/images/literole/01.jpg", "/images/literole/06.jpg",
		"/images/literole/12.jpg", "/images/literole/15.jpg"
	];

	// --- FONCTION POUR CHARGER LE FOOTER ET LANCER LE SLIDER ---
	function loadAndInitFooter() {
		var $placeholder = $('#footer-placeholder');
		if ($placeholder.length > 0) {
			fetch('footer.html')
				.then(response => response.text())
				.then(data => {
					$placeholder.html(data);
					
					// Une fois injecté, on lance la boucle de défilement
					var startIdx = 0;
					var $container = $('#footer-slideshow');
					
					if ($container.length > 0) {
						var $imgElements = $container.find('img');
						
						setInterval(function() {
							$imgElements.each(function(i) {
								var $img = $(this);
								var nextImg = imagesDisponibles[(startIdx + i) % imagesDisponibles.length];
								
								$img.css('opacity', '0');
								setTimeout(function() {
									$img.attr('src', nextImg);
									$img.css('opacity', '1');
								}, 600);
							});
							startIdx = (startIdx + 1) % imagesDisponibles.length;
						}, 5000);
					}
				});
		}
	}

	// --- FONCTION POUR LA GALERIE (LIGHTBOX) ---
	function initGalleryLightbox() {
		var $lightbox = $('#lightbox');
		var $lightboxImg = $('#lightbox-img');

		if ($lightbox.length > 0) {
			// Au clic sur une image de la galerie
			$(document).on('click', '.gallery img', function() {
				var src = $(this).attr('src');
				$lightboxImg.attr('src', src);
				$lightbox.css('display', 'flex');
			});

			// Fermer la lightbox
			$lightbox.on('click', function() {
				$(this).hide();
			});
		}
	}

	// --- LANCEMENT ---
	$window.on('load', function() {
		loadAndInitFooter();
		initGalleryLightbox();
	});

})(jQuery);