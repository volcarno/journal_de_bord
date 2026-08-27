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

	// Scrolly.
		$('.scrolly').scrolly();

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
	// Chemins absolus depuis la racine du site (fonctionne quelle que soit la
	// profondeur de la page), généré à partir de GALLERY_DATA (assets/js/
	// gallery-data.js, la même liste que celle utilisée par galerie.html) :
	// toutes les photos du site sont donc éligibles, dans un ordre mélangé
	// tiré au hasard à chaque chargement de page.
	function pad(n) { return (n < 10 ? '0' : '') + n; }

	function shuffle(array) {
		var i, j, tmp;
		for (i = array.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			tmp = array[i];
			array[i] = array[j];
			array[j] = tmp;
		}
		return array;
	}

	var imagesDisponibles = (function() {
		var base = '/journal_de_bord/images/',
			list = [],
			i;

		if (typeof GALLERY_DATA === 'undefined')
			return list;

		GALLERY_DATA.forEach(function(entry) {
			for (i = 0; i < entry.count; i++)
				list.push(base + entry.folder + '/' + pad(entry.start + i) + '.jpg');
		});

		return shuffle(list);
	})();

	// --- MENU (desktop + mobile) ---
	// Construit le HTML du menu <ul><li> à partir de NAV_DATA (assets/js/nav-data.js).
	// Ajouter une page au site = ajouter une entrée dans ce fichier, pas ici.
	function renderNavItem(item) {

		if (item.home) {
			return '<li class="home-logo">' +
				'<a href="/journal_de_bord/index.html">' +
					'<img src="/journal_de_bord/images/flamme.png" alt="Retour à l\'accueil" />' +
				'</a>' +
			'</li>';
		}

		var html = '<li><a href="' + item.url + '">' + item.title + '</a>';

		if (item.children && item.children.length)
			html += renderNavList(item.children);

		html += '</li>';

		return html;

	}

	function renderNavList(items) {
		return '<ul>' + items.map(renderNavItem).join('') + '</ul>';
	}

	function renderNav() {
		if (typeof NAV_DATA === 'undefined')
			return;

		$('#nav').html(renderNavList(NAV_DATA));
	}

	// Construit le menu déroulant et le panneau burger mobile. Doit être appelé
	// une fois que #nav existe réellement dans le DOM (donc après l'injection du
	// header par loadIncludes), sinon le panneau mobile est construit vide.
	function initNav() {

		renderNav();

		// Panneau mobile : on clone la structure réelle de #nav (avant que
		// dropotron n'y touche) pour garder les sous-menus imbriqués, repliés
		// par défaut. Chaque catégorie ayant des enfants reçoit une flèche qui
		// déplie/replie uniquement sa propre sous-liste (accordéon), au lieu
		// d'afficher tous les niveaux d'un coup comme navList().
			var $mobileList = $('#nav > ul').clone(true).addClass('mobile-nav-list');

		// Dans le panneau mobile, l'entrée "accueil" devient un simple texte
		// (pas d'image flamme ni de fond volcan, uniquement visible ici).
			$mobileList.children('li.home-logo')
				.find('img').remove().end()
				.find('a').text('Accueil');

			$mobileList.find('li').each(function() {

				var $li = $(this),
					$childUl = $li.children('ul');

				if ($childUl.length === 0)
					return;

				$li.addClass('has-children');
				$childUl.hide();

				$('<span class="nav-toggle"><i class="fas fa-chevron-down"></i></span>')
					.appendTo($li)
					.on('click', function(event) {
						event.preventDefault();
						event.stopPropagation();
						$li.toggleClass('nav-open');
						$childUl.stop(true, true).slideToggle(250);
					});

			});

			$(
				'<div id="navPanel">' +
					'<nav class="mobile-nav"></nav>' +
				'</div>'
			)
				.appendTo($body)
				.find('nav')
					.append($mobileList)
				.end()
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

		// Bouton burger (mobile).
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Dropdowns (desktop). Appelé après le clone ci-dessus pour que le
		// panneau mobile parte d'un #nav intact, non modifié par dropotron.
			$('#nav > ul').dropotron({
				mode: 'fade',
				speed: 350,
				noOpenerFade: true,
				alignment: 'center',
				selector: '> li:not(.home-logo)'
			});

		// Bouton GO : sur la page d'accueil elle-même, on veut un défilement
		// fluide vers #banner plutôt qu'un saut instantané. Le plugin scrolly
		// n'accroche que les liens dont le href commence par "#" (voir
		// jquery.scrolly.min.js), donc on ne peut pas l'utiliser tel quel sur
		// un lien "/journal_de_bord/index.html#banner". Sur les autres pages,
		// on garde ce lien complet pour revenir à l'accueil normalement.
		// Comme le header est injecté après coup (fetch asynchrone), le
		// $('.scrolly').scrolly() lancé plus haut dans ce fichier n'a pas pu
		// accrocher ce bouton : il faut le refaire ici, une fois le bouton
		// réellement présent dans le DOM.
			var $go = $('#header .button.scrolly');

			if (/\/journal_de_bord\/(index\.html)?$/.test(location.pathname))
				$go.attr('href', '#banner');

			$go.scrolly();

	}

	// --- DIAPORAMA DU FOOTER ---
	function initFooterSlideshow() {

		var $container = $('#footer-slideshow');

		if ($container.length === 0)
			return;

		var startIdx = 0;
		var $imgElements = $container.find('img');

		setInterval(function() {
			$imgElements.each(function(i) {
				var $img = $(this);
				var nextSrc = imagesDisponibles[(startIdx + i) % imagesDisponibles.length];

				// On précharge la prochaine photo en arrière-plan avant de
				// l'afficher : sur une connexion lente (ou beaucoup d'images
				// à charger en même temps ailleurs sur la page), la photo
				// affichée resterait sinon remplacée par le tour suivant
				// avant même d'avoir fini de charger, et ne s'afficherait
				// jamais. Ici l'ancienne photo reste visible le temps qu'il
				// faut, sans jamais montrer de vignette vide.
				var preloader = new Image();
				preloader.onload = function() {
					$img.css('opacity', '0');
					setTimeout(function() {
						$img.attr('src', nextSrc);
						$img.css('opacity', '1');
					}, 300);
				};
				preloader.src = nextSrc;
			});
			startIdx = (startIdx + $imgElements.length) % imagesDisponibles.length;
		}, 5000);

	}

	// --- CHARGEMENT DES FRAGMENTS COMMUNS (header, footer, page en construction) ---
	// Chemin absolu depuis la racine du site : fonctionne quelle que soit la
	// profondeur de la page (racine, pays/, volcan-html-files/, ...) sans avoir
	// à ajuster le chemin à la main dans chaque fichier HTML.
	function loadFragment(placeholderSelector, path, onLoaded) {

		var $placeholder = $(placeholderSelector);

		if ($placeholder.length === 0)
			return;

		fetch(path)
			.then(response => response.text())
			.then(data => {
				$placeholder.replaceWith(data);

				if (onLoaded)
					onLoaded();
			});

	}

	function loadIncludes() {

		var base = '/journal_de_bord/';

		loadFragment('#header-placeholder', base + 'header.html', initNav);
		loadFragment('#footer-placeholder', base + 'footer.html', initFooterSlideshow);
		loadFragment('#construction-placeholder', base + 'template/construction.html');

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
	loadIncludes();

	$window.on('load', function() {
		initGalleryLightbox();
	});

})(jQuery);