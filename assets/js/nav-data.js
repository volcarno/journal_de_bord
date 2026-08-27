/*
	Liste du menu de navigation de Volcarno.

	Pour ajouter une page au menu : ajoute un objet { title, url } dans le
	tableau "children" de la catégorie concernée, à l'endroit où tu veux
	qu'il apparaisse. Pas de children -> lien simple. Avec children -> la
	catégorie devient dépliable (menu desktop en cascade, accordéon mobile).

	Ce fichier est lu par assets/js/main.js (fonction renderNav), qui
	construit automatiquement le menu desktop ET le menu mobile à partir
	de cette seule liste.
*/
var NAV_DATA = [
	{
		title: "Volcans",
		url: "/journal_de_bord/volcan-html-files/passion-volcan.html",
		children: [
			{
				title: "Science des volcans …",
				url: "/journal_de_bord/volcan-html-files/science-volcans.html",
				children: [
					{ title: "Les volcans vulgarisés", url: "/journal_de_bord/volcan-html-files/science-vulgarisee.html" },
					{ title: "Connaissances générales", url: "/journal_de_bord/volcan-html-files/science-connaissances-generales.html" },
					{ title: "Géodynamique et formation des magmas", url: "/journal_de_bord/volcan-html-files/science-geodynamique.html" },
					{ title: "Minéralogie et pétrologie des magmas", url: "/journal_de_bord/volcan-html-files/science-mineralogie.html" },
					{ title: "Processus d'éruption et dynamisme des magmas", url: "/journal_de_bord/volcan-html-files/science-eruption-dynamisme.html" },
					{ title: "Géochimie", url: "/journal_de_bord/volcan-html-files/science-geochimie.html" },
					{ title: "Géophysique, signe d'éruption et imagerie satellite", url: "/journal_de_bord/volcan-html-files/science-geophysique.html" },
					{ title: "Surveillance, risques et impacts", url: "/journal_de_bord/volcan-html-files/science-surveillance-risques.html" },
					{ title: "Modélisation numérique", url: "/journal_de_bord/volcan-html-files/science-modelisation.html" },
					{ title: "Eruptions historiques", url: "/journal_de_bord/volcan-html-files/science-eruptions-historiques.html" },
					{ title: "Bonus !", url: "/journal_de_bord/volcan-html-files/science-bonus.html" }
				]
			},
			{
				title: "Volcans d'Amérique Centrale …",
				url: "/journal_de_bord/volcan-html-files/volcan-ac.html",
				children: [
					{
						title: "Guatemala …",
						url: "/journal_de_bord/pays/guatemala.html",
						children: [
							{ title: "Pacaya", url: "/journal_de_bord/volcan-html-files/pacaya.html" },
							{ title: "Fuego et Acatenango", url: "/journal_de_bord/volcan-html-files/fuego.html" },
							{ title: "San Pedro", url: "/journal_de_bord/volcan-html-files/sanpedro.html" },
							{ title: "Atitlan", url: "/journal_de_bord/volcan-html-files/atitlan.html" },
							{ title: "Toliman", url: "/journal_de_bord/volcan-html-files/toliman.html" },
							{ title: "Zunil", url: "/journal_de_bord/volcan-html-files/zunil.html" },
							{ title: "Tajumulco", url: "/journal_de_bord/volcan-html-files/tajumulco.html" },
							{ title: "Santiaguito ♥", url: "/journal_de_bord/volcan-html-files/santiaguito.html" },
							{ title: "Santa Maria", url: "/journal_de_bord/volcan-html-files/santamaria.html" }
						]
					},
					{
						title: "Salvador …",
						url: "/journal_de_bord/pays/salvador.html",
						children: [
							{ title: "Santa Ana", url: "/journal_de_bord/volcan-html-files/santaana.html" },
							{ title: "Conchagua", url: "/journal_de_bord/volcan-html-files/conchagua.html" }
						]
					},
					{
						title: "Nicaragua …",
						url: "/journal_de_bord/pays/nicaragua.html",
						children: [
							{ title: "San Cristobal", url: "/journal_de_bord/volcan-html-files/sancristobal.html" },
							{ title: "Telica", url: "/journal_de_bord/volcan-html-files/telica.html" },
							{ title: "Cerro Negro", url: "/journal_de_bord/volcan-html-files/cerronegro.html" },
							{ title: "Mombacho", url: "/journal_de_bord/volcan-html-files/mombacho.html" },
							{ title: "Concepcion", url: "/journal_de_bord/volcan-html-files/concepcion.html" }
						]
					},
					{
						title: "Costa Rica …",
						url: "/journal_de_bord/pays/costarica.html",
						children: [
							{ title: "Arenal", url: "/journal_de_bord/volcan-html-files/arenal.html" },
							{ title: "Irazu", url: "/journal_de_bord/volcan-html-files/irazu.html" }
						]
					}
				]
			},
			{
				title: "Volcans du Kamtchatka …",
				url: "/journal_de_bord/pays/kamtchatka.html",
				children: [
					{ title: "Tolbachik", url: "/journal_de_bord/volcan-html-files/tolbachik.html" },
					{ title: "Klioutchevskoi", url: "/journal_de_bord/volcan-html-files/klioutchevskoi.html" },
					{ title: "Vallée des geysers", url: "/journal_de_bord/volcan-html-files/vallee-des-geysers.html" },
					{ title: "Karimski", url: "/journal_de_bord/volcan-html-files/karimski.html" }
				]
			},
			{
				title: "Volcans Italiens …",
				url: "/journal_de_bord/pays/italie.html",
				children: [
					{ title: "Etna", url: "/journal_de_bord/volcan-html-files/etna.html" },
					{ title: "Vésuve", url: "/journal_de_bord/volcan-html-files/vesuve.html" },
					{ title: "Stromboli", url: "/journal_de_bord/volcan-html-files/stromboli.html" },
					{ title: "Vulcano", url: "/journal_de_bord/volcan-html-files/vulcano.html" }
				]
			}
		]
	},
	{
		title: "Voyages",
		url: "/journal_de_bord/voyage-rando-trail/accueil-voyage-rando-trail.html",
		children: [
			{
				title: "Pyrénnées …",
				url: "/journal_de_bord/voyage-rando-trail/pyrennees.html",
				children: [
					{ title: "Trail - Pic de Perdiguère, Literole, côté français", url: "/journal_de_bord/voyage-rando-trail/trail-literole.html" },
					{ title: "Rando - Pic du Montcalm et d'Estats", url: "/journal_de_bord/voyage-rando-trail/rando-montcalm.html" },
					{ title: "Rando - Turon de Néouvielle", url: "/journal_de_bord/voyage-rando-trail/rando-turon-neouvielle.html" },
					{ title: "Rando - Petit Vignemale en boucle", url: "/journal_de_bord/voyage-rando-trail/rando-petit-vignemale.html" },
					{ title: "Rando - Etang des Bésines", url: "/journal_de_bord/voyage-rando-trail/rando-besines.html" },
					{ title: "Rando - Brèche de Rolland, Taillon et vires Espagnoles", url: "/journal_de_bord/voyage-rando-trail/rando-breche-rolland.html" },
					{ title: "Rando - Vallée de Gaube et du Marcadau", url: "/journal_de_bord/voyage-rando-trail/rando-vallee-gaube.html" },
					{ title: "Rando - Pic de Sauvegarde par l'Hospice de France", url: "/journal_de_bord/voyage-rando-trail/rando-pic-sauvegarde.html" },
					{ title: "Rando - Lac de Tor de Riuth", url: "/journal_de_bord/voyage-rando-trail/rando-lac-tor-riuth.html" },
					{ title: "Rando - Aneto, depuis Benasque", url: "/journal_de_bord/voyage-rando-trail/rando-aneto.html" },
					{ title: "Rando - Pic de Perdiguère, Literole, côté espagnol", url: "/journal_de_bord/voyage-rando-trail/rando-perdiguere-espagnol.html" }
				]
			},
			{
				title: "Ouzbékistan et Tajikistan …",
				url: "/journal_de_bord/pays/ouzbekistan-tadjikistan.html",
				children: [
					{ title: "Tashkent", url: "/journal_de_bord/pays/tashkent.html" },
					{ title: "Khiva et le Karakalpakstan", url: "/journal_de_bord/pays/khiva-karakalpakstan.html" },
					{ title: "Boukhara", url: "/journal_de_bord/pays/boukhara.html" },
					{ title: "Samarkand", url: "/journal_de_bord/pays/samarkand.html" },
					{ title: "Douchambé", url: "/journal_de_bord/pays/douchambe.html" },
					{ title: "La route du Pamir", url: "/journal_de_bord/pays/route-pamir.html" }
				]
			},
			{
				title: "Norvège …",
				url: "/journal_de_bord/pays/norvege.html",
				children: [
					{ title: "Trondheim", url: "/journal_de_bord/pays/trondheim.html" },
					{ title: "Les îles Lofotens", url: "/journal_de_bord/voyage-rando-trail/voyage-lofoten.html" }
				]
			},
			{
				title: "Amérique Centrale …",
				url: "/journal_de_bord/pays/amerique-centrale.html",
				children: [
					{ title: "Guatemala ♥", url: "/journal_de_bord/pays/guatemala.html" },
					{ title: "Salvador ♥", url: "/journal_de_bord/pays/salvador.html" },
					{ title: "Nicaragua", url: "/journal_de_bord/pays/nicaragua.html" },
					{ title: "Costa Rica", url: "/journal_de_bord/pays/costarica.html" }
				]
			},
			{
				title: "Canada …",
				url: "/journal_de_bord/pays/canada.html",
				children: [
					{ title: "Montréal et ses environs", url: "/journal_de_bord/pays/canada-montreal.html" },
					{ title: "Le Québec", url: "/journal_de_bord/pays/canada-quebec.html" },
					{ title: "Les Rocheuses Canadiennes", url: "/journal_de_bord/pays/canada-rocheuses.html" }
				]
			},
			{
				title: "USA - Nord-Est …",
				url: "/journal_de_bord/pays/usa-nord-est.html",
				children: [
					{ title: "Chicago", url: "/journal_de_bord/pays/usa-chicago.html" },
					{ title: "New York", url: "/journal_de_bord/pays/usa-new-york.html" },
					{ title: "Boston", url: "/journal_de_bord/pays/usa-boston.html" }
				]
			},
			{ title: "Israël et Palestine", url: "/journal_de_bord/pays/israel-palestine.html" }
		]
	},
	{ home: true },
	{
		title: "Autre",
		url: "/journal_de_bord/autre/accueil-autre.html",
		children: [
			{ title: "Matériel", url: "/journal_de_bord/autre/matos.html" },
			{ title: "Astronomie", url: "/journal_de_bord/autre/astro.html" },
			{
				title: "Météorologie",
				url: "/journal_de_bord/autre/meteo.html",
				children: [
					{
						title: "Les bases …",
						url: "/journal_de_bord/autre/meteo-bases.html",
						children: [
							{ title: "xx", url: "/journal_de_bord/autre/meteo-bases.html" },
							{ title: "xx", url: "/journal_de_bord/autre/meteo-bases.html" },
							{ title: "xx", url: "/journal_de_bord/autre/meteo-bases.html" },
							{ title: "xx", url: "/journal_de_bord/autre/meteo-bases.html" }
						]
					},
					{
						title: "Météo des volcans …",
						url: "/journal_de_bord/autre/meteo-volcans.html",
						children: [
							{ title: "xx", url: "/journal_de_bord/autre/meteo-volcans.html" },
							{ title: "xx", url: "/journal_de_bord/autre/meteo-volcans.html" },
							{ title: "xx", url: "/journal_de_bord/autre/meteo-volcans.html" },
							{ title: "xx", url: "/journal_de_bord/autre/meteo-volcans.html" }
						]
					}
				]
			},
			{
				title: "Tutoriels …",
				url: "/journal_de_bord/autre/tutoriels/",
				children: [
					{ title: "Se répérer avec un GPS", url: "/journal_de_bord/autre/tutoriels/gpx.html" }
				]
			},
			{
				title: "Réflexions …",
				url: "/journal_de_bord/autre/reflexions.html",
				children: [
					{ title: "Fast Fashion", url: "/journal_de_bord/autre/reflexions-fast-fashion.html" },
					{ title: "xxx", url: "/journal_de_bord/autre/reflexions-autres.html" },
					{ title: "xxx", url: "/journal_de_bord/autre/reflexions-autres.html" },
					{ title: "xxx", url: "/journal_de_bord/autre/reflexions-autres.html" }
				]
			},
			{ title: "Les aventures de Tonio !  ♥", url: "/journal_de_bord/autre/tonio.html" },
			{ title: "Galerie photo  ♥", url: "/journal_de_bord/galerie.html" }
		]
	},
	{ title: "À propos  ♥", url: "/journal_de_bord/autre/pourquoi-jdb.html" }
];
