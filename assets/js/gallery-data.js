/*
	GALLERY_DATA
	============
	Liste de tous les dossiers de photos du site, utilisée par galerie.html
	(pour construire la galerie complète + le filtre par étiquette) et par
	main.js (pour alimenter le diaporama du footer avec toutes les photos,
	dans un ordre aléatoire).

	Pour ajouter un nouveau dossier de photos : ajouter une entrée avec le
	nom du dossier dans images/, l'indice de départ (0 ou 1 selon la
	numérotation des fichiers), le nombre de photos, et une liste
	d'étiquettes (en minuscules, sans accents) pour la recherche.
*/
var GALLERY_DATA = [
	{ folder: 'santiaguito',      start: 1, count: 31,  label: 'Santiaguito',        tags: ['santiaguito', 'volcan', 'guatemala', 'amerique-centrale'] },
	{ folder: 'guatemala',        start: 0, count: 74,  label: 'Guatemala',          tags: ['guatemala', 'amerique-centrale', 'pays', 'volcan'] },
	{ folder: 'salvador',         start: 0, count: 65,  label: 'Salvador',           tags: ['salvador', 'amerique-centrale', 'pays', 'volcan'] },
	{ folder: 'nicaragua',        start: 0, count: 145, label: 'Nicaragua',          tags: ['nicaragua', 'amerique-centrale', 'pays', 'volcan'] },
	{ folder: 'costarica',        start: 0, count: 30,  label: 'Costa Rica',         tags: ['costa-rica', 'amerique-centrale', 'pays', 'volcan'] },
	{ folder: 'lofoten',          start: 1, count: 26,  label: 'Lofoten',            tags: ['lofoten', 'norvege', 'voyage', 'rando', 'nature'] },
	{ folder: 'canada-quebec',    start: 1, count: 18,  label: 'Québec',             tags: ['quebec', 'canada', 'voyage', 'ville'] },
	{ folder: 'canada-montreal',  start: 1, count: 61,  label: 'Montréal',           tags: ['montreal', 'canada', 'voyage', 'ville'] },
	{ folder: 'canada-rocheuses', start: 1, count: 45,  label: 'Rocheuses Canadiennes', tags: ['rocheuses', 'canada', 'voyage', 'rando', 'nature'] },
	{ folder: 'usa-chicago',      start: 1, count: 12,  label: 'Chicago',            tags: ['chicago', 'usa', 'voyage', 'ville'] },
	{ folder: 'usa-new-york',     start: 1, count: 8,   label: 'New York',           tags: ['new-york', 'usa', 'voyage', 'ville'] },
	{ folder: 'usa-boston',       start: 1, count: 8,   label: 'Boston',             tags: ['boston', 'usa', 'voyage', 'ville'] },
	{ folder: 'montcalm',         start: 1, count: 13,  label: 'Pic du Montcalm',    tags: ['montcalm', 'pyrenees', 'rando', 'france'] },
	{ folder: 'besines',          start: 1, count: 7,   label: 'Étangs de Bésines',  tags: ['besines', 'pyrenees', 'rando', 'france'] },
	{ folder: 'neouvielle',       start: 1, count: 11,  label: 'Turon de Néouvielle', tags: ['neouvielle', 'pyrenees', 'rando', 'france'] },
	{ folder: 'petit-vignemale',  start: 1, count: 16,  label: 'Petit Vignemale',    tags: ['vignemale', 'pyrenees', 'rando', 'france'] },
	{ folder: 'literole',         start: 1, count: 16,  label: 'Literole - Perdiguère', tags: ['literole', 'perdiguere', 'pyrenees', 'trail', 'france'] },
	{ folder: '10j-pyr',          start: 0, count: 2,   label: '10 jours en van dans les Pyrénées', tags: ['pyrenees', 'voyage', 'van', 'france'] }
];
