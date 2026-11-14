/*
 * Backlog Tongo : source unique des Epics, User Stories (US) et Technical Stories (TS).
 * Les pages index.html, user-stories.html et technical-stories.html lisent ce fichier.
 * Statuts : "todo" (À faire) | "doing" (En cours) | "done" (Fait)
 * Priorités MoSCoW : "M" Must | "S" Should | "C" Could | "W" Won't (cette version)
 * Points : suite de Fibonacci (1, 2, 3, 5, 8, 13)
 */
window.TONGO = {
  updated: "2026-11-14",
  version: "V1",

  epics: [
    { id: "E1", name: "Atlas & navigation", desc: "Accueil et portes d'entrée : par langue, par écriture, par son." },
    { id: "E2", name: "Écritures", desc: "Présentation d'une écriture et tableau de ses caractères." },
    { id: "E3", name: "Fiche caractère", desc: "Glyphe, prononciation, formes, composition, mots d'exemple." },
    { id: "E4", name: "Sons (IPA)", desc: "L'IPA comme pivot : un son et ses graphies dans le monde." },
    { id: "E5", name: "Recherche", desc: "Retrouver une langue, une écriture, un caractère ou un son." },
    { id: "E6", name: "Langues d'interface", desc: "Interface multilingue et langue de référence pour les comparaisons." },
    { id: "E7", name: "Production du contenu", desc: "Agrégation des sources, IA hors appli, croisement, publication statique." },
    { id: "E8", name: "Audio", desc: "Sons IPA, prononciation des caractères et des mots." },
    { id: "E9", name: "Plateforme & qualité", desc: "Web et mobile, typographie, accessibilité, licences, déploiement." }
  ],

  /* Détail complet dans personas.html */
  personas: [
    { id: "P1", name: "Léa", short: "La voyageuse curieuse" },
    { id: "P2", name: "Noah", short: "L'enfant explorateur" },
    { id: "P3", name: "Samira", short: "Celle qui renoue avec ses racines" },
    { id: "P4", name: "Hugo", short: "Le passionné des langues" }
  ],

  stories: [
    /* ───────────── USER STORIES ───────────── */
    {
      id: "US-001", type: "US", epic: "E6", persona: "P1", priority: "M", points: 3, status: "done",
      title: "Interface dans la langue de mon navigateur",
      as: "visiteur qui ouvre Tongo pour la première fois",
      want: "que l'interface s'affiche directement dans la langue déclarée par mon navigateur",
      so: "comprendre l'application sans rien régler et obtenir des comparaisons de sons dans une langue que je connais",
      criteria: [
        ["mon navigateur déclare une langue d'interface disponible", "j'ouvre Tongo pour la première fois", "l'interface s'affiche dans cette langue, qui devient ma langue de référence, sans écran de choix"],
        ["mon navigateur déclare plusieurs langues", "j'ouvre Tongo", "la première langue disponible dans l'ordre de mes préférences est utilisée"],
        ["aucune langue déclarée n'est disponible", "j'ouvre Tongo", "l'interface s'affiche dans la langue de repli (anglais)"],
        ["j'ai changé de langue dans les réglages", "je rouvre Tongo", "mon choix est conservé sur l'appareil, sans compte, et prime sur la langue du navigateur"]
      ]
    },
    {
      id: "US-002", type: "US", epic: "E6", persona: "P4", priority: "M", points: 2, status: "done",
      title: "Changer de langue d'interface",
      as: "visiteur",
      want: "changer à tout moment la langue de l'interface et la langue de référence",
      so: "adapter l'application si je me suis trompé ou si je la partage avec quelqu'un",
      criteria: [
        ["je suis sur n'importe quel écran", "j'ouvre les réglages et choisis une autre langue", "l'interface et les comparaisons basculent immédiatement, sans perdre ma position"]
      ]
    },
    {
      id: "US-003", type: "US", epic: "E1", persona: "P1", priority: "M", points: 3, status: "done",
      title: "Accueil Atlas avec trois portes d'entrée",
      as: "visiteur",
      want: "choisir dès l'accueil d'explorer par langue, par écriture ou par son",
      so: "commencer mon voyage selon ce qui m'intéresse",
      criteria: [
        ["je suis sur l'accueil", "je regarde l'écran", "je vois trois entrées : Langues, Écritures, Sons, avec une ambiance visuelle de voyage"],
        ["je suis sur l'accueil", "je touche une entrée", "j'arrive sur la liste correspondante"]
      ]
    },
    {
      id: "US-004", type: "US", epic: "E1", persona: "P1", priority: "M", points: 3, status: "doing",
      title: "Explorer par langue",
      as: "voyageuse qui prépare un séjour",
      want: "trouver la langue du pays où je vais",
      so: "découvrir son écriture",
      criteria: [
        ["je suis dans l'entrée Langues", "je parcours la liste", "les 20 langues sont affichées avec leur nom dans ma langue et dans la langue elle-même (endonyme)"],
        ["je touche une langue", "", "j'arrive sur la page de son écriture, filtrée sur les caractères utilisés par cette langue"]
      ]
    },
    {
      id: "US-005", type: "US", epic: "E1", persona: "P4", priority: "M", points: 3, status: "done",
      title: "Explorer par écriture",
      as: "curieux de linguistique",
      want: "parcourir une galerie des écritures du monde",
      so: "comparer leurs formes et leurs fonctionnements",
      criteria: [
        ["je suis dans l'entrée Écritures", "je parcours la galerie", "chaque écriture est présentée avec un échantillon de caractères, son nom et son type (alphabet, abjad, abugida, syllabaire, alphabet à traits)"],
        ["je touche une écriture", "", "j'arrive sur sa page"]
      ]
    },
    {
      id: "US-006", type: "US", epic: "E2", persona: "P4", priority: "M", points: 5, status: "done",
      title: "Page Écriture : présentation",
      as: "visiteur",
      want: "comprendre en quelques lignes comment fonctionne une écriture",
      so: "savoir ce que je vais apprendre à reconnaître",
      criteria: [
        ["je suis sur la page d'une écriture", "je lis l'en-tête", "je vois son type expliqué simplement, son sens d'écriture, une courte présentation et les langues qui l'utilisent"],
        ["l'écriture s'écrit de droite à gauche", "j'affiche ses caractères", "ils s'affichent correctement dans ce sens"]
      ]
    },
    {
      id: "US-007", type: "US", epic: "E2", persona: "P1", priority: "M", points: 5, status: "doing",
      title: "Tableau des caractères d'une écriture",
      as: "visiteur",
      want: "voir tous les caractères d'une écriture, organisés selon sa logique",
      so: "avoir une vue d'ensemble avant d'entrer dans le détail",
      criteria: [
        ["je suis sur la page d'une écriture", "j'affiche le tableau", "les caractères sont regroupés selon la structure de l'écriture (voyelles/consonnes, tableau des kana, consonnes/voyelles du hangeul…)"],
        ["l'écriture sert à plusieurs langues (ex. arabe et persan)", "je choisis une langue", "seuls les caractères de cette langue sont affichés, ceux qui lui sont propres étant mis en évidence"],
        ["je touche un caractère", "", "sa fiche s'ouvre"]
      ]
    },
    {
      id: "US-008", type: "US", epic: "E3", persona: "P1", priority: "M", points: 5, status: "doing",
      title: "Fiche caractère : reconnaître et prononcer",
      as: "visiteur",
      want: "voir un caractère en grand, sa translittération et l'entendre",
      so: "le reconnaître et savoir le prononcer",
      criteria: [
        ["je suis sur la fiche d'un caractère", "elle s'affiche", "je vois le glyphe en grand, son nom, sa translittération et sa famille (voyelle, consonne…)"],
        ["je suis sur la fiche", "je touche le bouton audio", "j'entends la prononciation du caractère dans la langue choisie"],
        ["le caractère se prononce différemment selon la langue (ex. « j »)", "je change de langue", "la prononciation et l'audio s'adaptent"],
        ["j'ai choisi un pays pour cette langue (US-024)", "j'ouvre la fiche", "la prononciation, l'IPA et l'audio sont ceux de ce pays"]
      ]
    },
    {
      id: "US-009", type: "US", epic: "E3", persona: "P2", priority: "M", points: 3, status: "doing",
      title: "Mots d'exemple",
      as: "enfant curieux",
      want: "voir des mots simples qui contiennent le caractère et les entendre",
      so: "comprendre comment il sonne dans un vrai mot",
      criteria: [
        ["je suis sur la fiche d'un caractère", "je regarde la section exemples", "je vois 1 à 3 mots simples et imageables, le caractère étant mis en évidence, avec leur traduction dans ma langue"],
        ["je touche un mot", "", "j'entends sa prononciation"]
      ]
    },
    {
      id: "US-010", type: "US", epic: "E4", persona: "P1", priority: "S", points: 5, status: "doing",
      title: "Comparaison avec ma langue",
      as: "visiteur",
      want: "qu'on me dise à quel son de ma langue correspond le caractère",
      so: "le prononcer sans connaître l'alphabet phonétique",
      criteria: [
        ["ma langue de référence contient ce son", "j'ouvre la fiche", "je lis une comparaison du type « comme le ch de chat », avec l'audio du mot de ma langue"],
        ["ma langue ne contient pas ce son", "j'ouvre la fiche", "je lis une indication approchante clairement signalée comme approximative"]
      ]
    },
    {
      id: "US-011", type: "US", epic: "E3", persona: "P3", priority: "M", points: 3, status: "doing",
      title: "Formes contextuelles arabes",
      as: "personne qui renoue avec l'écriture arabe",
      want: "voir les quatre formes d'une lettre (isolée, initiale, médiane, finale)",
      so: "la reconnaître dans un vrai mot",
      criteria: [
        ["je suis sur la fiche d'une lettre arabe ou persane", "je regarde la section formes", "je vois les quatre formes, ou celles qui existent pour les lettres qui ne se lient pas à gauche"],
        ["je regarde un mot d'exemple", "", "la forme utilisée dans le mot est mise en évidence"]
      ]
    },
    {
      id: "US-012", type: "US", epic: "E3", persona: "P4", priority: "S", points: 8, status: "todo",
      title: "Composition syllabique (abugidas, hangeul)",
      as: "visiteur",
      want: "comprendre comment une consonne et un signe vocalique forment une syllabe",
      so: "lire les syllabes en hindi, bengali, tamoul, thaï ou coréen",
      criteria: [
        ["je suis sur la fiche d'une consonne d'abugida", "je regarde la section composition", "je vois la consonne combinée avec les principaux signes vocaliques, chaque combinaison ayant son audio"],
        ["je suis sur la fiche d'un jamo coréen", "je regarde la composition", "je vois comment il s'assemble dans un bloc syllabique"]
      ]
    },
    {
      id: "US-013", type: "US", epic: "E3", persona: "P1", priority: "S", points: 2, status: "done",
      title: "Correspondance hiragana / katakana",
      as: "voyageuse qui part au Japon",
      want: "voir le katakana équivalent d'un hiragana, et inversement",
      so: "reconnaître les deux syllabaires",
      criteria: [
        ["je suis sur la fiche d'un kana", "elle s'affiche", "je vois son équivalent dans l'autre syllabaire, avec un lien vers sa fiche"]
      ]
    },
    {
      id: "US-014", type: "US", epic: "E4", persona: "P4", priority: "S", points: 5, status: "doing",
      title: "Page Son : un son dans le monde",
      as: "curieux de linguistique",
      want: "voir comment un même son s'écrit dans toutes les langues",
      so: "faire des ponts entre les écritures",
      criteria: [
        ["je suis sur une fiche caractère", "je touche le son associé", "j'arrive sur la page de ce son, avec son audio"],
        ["je suis sur la page d'un son", "je la parcours", "je vois la graphie de ce son dans chaque langue qui le possède, avec un lien vers la fiche correspondante"]
      ]
    },
    {
      id: "US-015", type: "US", epic: "E4", persona: "P4", priority: "C", points: 8, status: "todo",
      title: "Grille des sons simplifiée",
      as: "visiteur",
      want: "explorer les sons du monde dans une grille sonore",
      so: "entendre et comparer les sons sans connaître l'IPA",
      criteria: [
        ["je suis dans l'entrée Sons", "j'affiche la grille", "les sons sont regroupés de façon compréhensible (voyelles, consonnes, lieu d'articulation simplifié), les symboles IPA restant secondaires"],
        ["je touche un son", "", "je l'entends et je peux ouvrir sa page"]
      ]
    },
    {
      id: "US-016", type: "US", epic: "E5", persona: "P1", priority: "S", points: 3, status: "todo",
      title: "Rechercher un caractère vu quelque part",
      as: "voyageuse",
      want: "coller ou taper un caractère pour retrouver sa fiche",
      so: "identifier ce que je vois sur une enseigne ou un menu",
      criteria: [
        ["je suis dans la recherche", "je colle un caractère pris en charge", "sa fiche s'affiche, ou un choix si plusieurs langues l'utilisent"],
        ["je colle un caractère non pris en charge", "", "un message m'indique l'écriture concernée si elle est connue, sinon qu'il n'est pas encore disponible"]
      ]
    },
    {
      id: "US-017", type: "US", epic: "E5", persona: "P2", priority: "M", points: 2, status: "done",
      title: "Rechercher une langue par son nom",
      as: "visiteur",
      want: "taper le nom d'une langue dans ma langue ou dans la sienne",
      so: "la retrouver rapidement",
      criteria: [
        ["je suis dans la recherche", "je tape « japonais », « 日本語 » ou « japanese »", "la langue japonaise apparaît dans les résultats, sans tenir compte de la casse ni des accents"]
      ]
    },
    {
      id: "US-018", type: "US", epic: "E3", persona: "P2", priority: "C", points: 1, status: "done",
      title: "Passer au caractère suivant",
      as: "visiteur",
      want: "passer au caractère précédent ou suivant depuis une fiche",
      so: "parcourir une écriture sans revenir au tableau",
      criteria: [
        ["je suis sur une fiche", "je balaye ou touche suivant/précédent", "la fiche suivante/précédente dans l'ordre du tableau s'affiche"]
      ]
    },
    {
      id: "US-019", type: "US", epic: "E8", persona: "P2", priority: "C", points: 2, status: "todo",
      title: "Réécouter lentement",
      as: "enfant",
      want: "réécouter une prononciation plus lentement",
      so: "bien distinguer le son",
      criteria: [
        ["un audio vient d'être joué", "je touche le bouton « lent »", "le même audio est rejoué à vitesse réduite, sans déformer le son"]
      ]
    },
    {
      id: "US-020", type: "US", epic: "E9", persona: "P2", priority: "M", points: 3, status: "doing",
      title: "Une interface accessible à tous les âges",
      as: "enfant ou adulte peu à l'aise avec le numérique",
      want: "une interface simple, lisible, avec de grandes zones tactiles",
      so: "utiliser Tongo sans aide",
      criteria: [
        ["j'utilise Tongo sur téléphone", "je navigue", "les zones tactiles font au moins 44×44 px et les textes sont courts, sans jargon (les termes techniques sont expliqués)"],
        ["j'utilise un lecteur d'écran", "je parcours une fiche", "le caractère, son nom et sa prononciation sont annoncés"]
      ]
    },
    {
      id: "US-021", type: "US", epic: "E9", persona: "P1", priority: "M", points: 3, status: "doing",
      title: "Utiliser Tongo sur web et mobile",
      as: "visiteur",
      want: "utiliser Tongo aussi bien sur ordinateur que sur téléphone",
      so: "l'avoir avec moi en voyage",
      criteria: [
        ["j'ouvre Tongo sur un téléphone, une tablette ou un ordinateur", "je navigue", "la mise en page s'adapte à l'écran sans défilement horizontal"]
      ]
    },
    {
      id: "US-023", type: "US", epic: "E3", persona: "P4", priority: "M", points: 3, status: "done",
      title: "Voir le niveau de confiance d'une information",
      as: "visiteur",
      want: "savoir à quel point une prononciation ou un mot d'exemple est fiable",
      so: "faire confiance au contenu en connaissance de cause",
      criteria: [
        ["je suis sur une fiche caractère", "je regarde la prononciation et les mots d'exemple", "chaque information porte un indicateur de confiance (sources concordantes / source unique / à vérifier), toujours visible"],
        ["je ne comprends pas l'indicateur", "je le touche", "une explication courte et sans jargon s'affiche, compréhensible par un enfant"],
        ["j'utilise un lecteur d'écran", "je parcours la fiche", "le niveau de confiance est annoncé en texte, pas seulement par une couleur"]
      ]
    },
    {
      id: "US-024", type: "US", epic: "E3", persona: "P1", priority: "S", points: 5, status: "doing",
      title: "Choisir le pays d'une langue",
      as: "voyageuse qui part au Portugal et non au Brésil",
      want: "choisir le pays dont j'entends la prononciation",
      so: "apprendre les sons que j'entendrai sur place",
      criteria: [
        ["une langue a plusieurs variantes (ex. portugais : Brésil, Portugal)", "je suis sur sa page ou sur une fiche", "un sélecteur de pays affiche les variantes disponibles, la plus parlée étant sélectionnée par défaut"],
        ["mon navigateur déclare une variante régionale (ex. en-GB)", "j'ouvre une langue qui a cette variante", "elle est présélectionnée"],
        ["je choisis un autre pays", "", "l'IPA, l'audio et les mots d'exemple concernés basculent sur cette variante, et mon choix est mémorisé sur l'appareil pour cette langue"],
        ["la prononciation est identique dans toutes les variantes", "j'ouvre la fiche", "aucune différence n'est signalée ; sinon, une note indique la prononciation dans les autres pays"]
      ]
    },
    {
      id: "US-022", type: "US", epic: "E9", persona: "P4", priority: "M", points: 1, status: "doing",
      title: "Sources et licence visibles",
      as: "visiteur",
      want: "savoir d'où viennent les contenus et sous quelle licence ils sont publiés",
      so: "leur faire confiance et pouvoir les réutiliser",
      criteria: [
        ["je suis sur une fiche ou sur la page À propos", "je cherche les sources", "les sources utilisées et la licence CC BY-SA sont indiquées, avec les attributions requises (audio compris)"]
      ]
    },

    /* ───────────── TECHNICAL STORIES ───────────── */
    {
      id: "TS-001", type: "TS", epic: "E7", priority: "M", points: 5, status: "done",
      title: "Modèle de données conceptuel",
      as: "équipe technique",
      want: "définir le modèle Langue → Écriture → Graphème → Phonème (IPA) → Mot d'exemple",
      so: "représenter toutes les langues vivantes, même si la V1 n'en contient que 20",
      criteria: [
        ["le modèle est rédigé", "on y place les 5 types d'écriture", "alphabet, abjad, abugida, syllabaire et alphabet à traits s'y représentent sans cas particulier codé en dur"],
        ["un graphème est partagé par plusieurs langues", "on modélise sa prononciation", "la prononciation est portée par le couple variante régionale (pays) + graphème, chaque langue ayant au moins une variante, dont une par défaut"],
        ["une lettre a des formes contextuelles ou une composition", "on la modélise", "formes et compositions sont des attributs du modèle"]
      ]
    },
    {
      id: "TS-002", type: "TS", epic: "E4", priority: "M", points: 2, status: "doing",
      title: "Conventions IPA",
      as: "équipe technique",
      want: "fixer le niveau de transcription (phonémique /…/) et une variante de référence par langue",
      so: "que les ponts entre langues reposent sur des données cohérentes",
      criteria: [
        ["la convention est rédigée", "on transcrit un graphème", "la transcription est phonémique ; chaque langue a une variante par défaut (la plus parlée) et éventuellement des variantes par pays, chacune identifiée par un code BCP 47 (pt-BR, pt-PT…) et documentée"],
        ["la V1 est livrée", "on liste les variantes", "elles correspondent à D23 : en-US/en-GB, pt-BR/pt-PT, es-ES/es-MX, fr-FR/fr-CA, arabe standard moderne seul, une variante unique pour les autres langues"]
      ]
    },
    {
      id: "TS-003", type: "TS", epic: "E7", priority: "M", points: 3, status: "done",
      title: "Format des données statiques et schéma de validation",
      as: "équipe technique",
      want: "un format de fichiers de contenu versionnés, accompagné d'un schéma",
      so: "publier un contenu statique, valide et lisible par l'appli",
      criteria: [
        ["un fichier de contenu est produit", "on le valide", "toute donnée manquante ou mal formée est signalée avant publication"]
      ]
    },
    {
      id: "TS-004", type: "TS", epic: "E7", priority: "M", points: 3, status: "todo",
      title: "Import des caractères (Unicode CLDR)",
      as: "équipe technique",
      want: "extraire les caractères utilisés par chacune des 20 langues depuis CLDR",
      so: "disposer d'une liste de référence des caractères par langue",
      criteria: [
        ["l'import est exécuté", "on contrôle les 20 langues", "chaque langue a sa liste de caractères, avec la source et la version de CLDR"]
      ]
    },
    {
      id: "TS-005", type: "TS", epic: "E7", priority: "M", points: 3, status: "todo",
      title: "Import des inventaires de phonèmes (PHOIBLE)",
      as: "équipe technique",
      want: "importer l'inventaire de phonèmes de chaque langue",
      so: "contrôler les correspondances graphème → son",
      criteria: [
        ["l'import est exécuté", "on contrôle une langue", "son inventaire de référence est choisi et documenté (PHOIBLE propose plusieurs inventaires par langue)"]
      ]
    },
    {
      id: "TS-006", type: "TS", epic: "E7", priority: "M", points: 8, status: "todo",
      title: "Correspondances graphème → IPA",
      as: "équipe technique",
      want: "produire pour chaque langue la correspondance entre graphèmes et phonèmes",
      so: "alimenter les fiches et les pages Son",
      criteria: [
        ["les correspondances sont générées (Epitran, Wiktionary…)", "on les compare à l'inventaire PHOIBLE", "tout phonème absent de l'inventaire est signalé"],
        ["un graphème a plusieurs prononciations selon le contexte", "on le traite", "la prononciation principale est retenue et les autres sont notées avec un exemple"]
      ]
    },
    {
      id: "TS-007", type: "TS", epic: "E7", priority: "M", points: 5, status: "todo",
      title: "Sélection des mots d'exemple",
      as: "équipe technique",
      want: "obtenir 1 à 3 mots d'exemple par caractère, avec leur IPA et leur traduction",
      so: "illustrer chaque caractère",
      criteria: [
        ["les mots sont proposés (Wiktionary + IA)", "on les contrôle", "chaque mot contient le caractère, est simple, imageable, adapté aux enfants et accompagné de son IPA"]
      ]
    },
    {
      id: "TS-008", type: "TS", epic: "E7", priority: "M", points: 8, status: "todo",
      title: "Pipeline IA d'agrégation et de rédaction (hors appli)",
      as: "équipe technique",
      want: "un pipeline IA qui agrège les sources et rédige descriptions et présentations dans les langues d'interface",
      so: "produire le contenu à l'échelle, l'IA restant absente de l'appli",
      criteria: [
        ["le pipeline tourne sur une langue", "il produit le contenu", "chaque élément produit cite sa ou ses sources, et toute génération sans source est marquée « à vérifier »"],
        ["le LLM propose une transcription IPA", "", "elle n'est conservée que si une source (PHOIBLE, Wiktionary, Epitran) la confirme : le LLM n'est jamais la source d'une donnée phonétique"]
      ]
    },
    {
      id: "TS-009", type: "TS", epic: "E7", priority: "M", points: 5, status: "todo",
      title: "Croisement des sources et indice de confiance",
      as: "équipe technique",
      want: "comparer automatiquement les sources et attribuer un indice de confiance à chaque donnée",
      so: "cibler les relectures humaines en priorité",
      criteria: [
        ["les données d'une langue sont agrégées", "on lance le croisement", "chaque donnée est classée concordante, en écart ou source unique, et un rapport liste les écarts"],
        ["une donnée est publiée", "", "son niveau de confiance est inclus dans le contenu publié pour être affiché (US-023). La relecture humaine est reportée à la V2 (D20)"]
      ]
    },
    {
      id: "TS-010", type: "TS", epic: "E6", priority: "M", points: 5, status: "doing",
      title: "Internationalisation (i18n)",
      as: "équipe technique",
      want: "externaliser tous les textes de l'interface et du contenu descriptif par langue, avec le français, l'anglais et l'arabe au lancement (D19)",
      so: "proposer une interface multilingue, extensible ensuite aux autres langues",
      criteria: [
        ["la V1 est livrée", "on parcourt l'appli en français, en anglais et en arabe", "tous les textes de l'interface et du contenu descriptif sont traduits dans ces trois langues"],
        ["l'interface est en arabe", "on affiche n'importe quel écran", "la mise en page est inversée (dir=\"rtl\"), et les glyphes et mots des écritures de gauche à droite restent lisibles dans leur sens (isolation bidirectionnelle)"],
        ["la langue de référence est le français, l'anglais ou l'arabe", "on ouvre une fiche caractère", "la comparaison de son (US-010) utilise un mot de cette langue"],
        ["une nouvelle langue d'interface est ajoutée", "on fournit ses traductions", "aucun code n'est modifié : aucun texte n'est codé en dur"]
      ]
    },
    {
      id: "TS-011", type: "TS", epic: "E8", priority: "M", points: 3, status: "todo",
      title: "Audio des phonèmes (Wikimedia Commons)",
      as: "équipe technique",
      want: "récupérer l'enregistrement de chaque phonème IPA utilisé",
      so: "faire entendre les sons isolés avec un audio humain",
      criteria: [
        ["les sons sont importés", "on contrôle un phonème", "son audio est disponible avec ses informations d'auteur et de licence"]
      ]
    },
    {
      id: "TS-012", type: "TS", epic: "E8", priority: "M", points: 5, status: "todo",
      title: "Audio des mots et des caractères : choix des sources",
      as: "équipe technique",
      want: "évaluer Lingua Libre et plusieurs moteurs de synthèse vocale sur les 20 langues",
      so: "choisir la meilleure source audio pour chaque langue",
      criteria: [
        ["l'étude est faite", "on compare les sources sur un échantillon par langue", "une source est retenue par langue, Lingua Libre en priorité et TTS en secours, et les limites sont documentées (caractères isolés, tons…)"]
      ]
    },
    {
      id: "TS-013", type: "TS", epic: "E8", priority: "S", points: 3, status: "todo",
      title: "Pré-génération et stockage des audios",
      as: "équipe technique",
      want: "générer tous les audios à l'avance et les publier avec le contenu statique",
      so: "ne dépendre d'aucun service de synthèse en direct",
      criteria: [
        ["le contenu d'une langue est publié", "un visiteur joue un audio", "le fichier est servi statiquement, dans un format compressé lisible sur web et mobile"]
      ]
    },
    {
      id: "TS-014", type: "TS", epic: "E9", priority: "M", points: 3, status: "done",
      title: "Décision plateforme : PWA, natif ou hybride",
      as: "équipe technique",
      want: "comparer une PWA, une appli native et une solution hybride pour couvrir web et mobile",
      so: "choisir l'architecture de l'appli",
      criteria: [
        ["l'étude est faite", "on compare les options", "la décision est justifiée (coût, hors ligne, publication en magasins d'applications, audio) et consignée dans le journal des décisions. Résultat : site statique Astro + PWA, Capacitor plus tard si besoin (D15)"]
      ]
    },
    {
      id: "TS-015", type: "TS", epic: "E9", priority: "M", points: 5, status: "doing",
      title: "Rendu typographique des 15 écritures",
      as: "équipe technique",
      want: "choisir des polices couvrant toutes les écritures (famille Noto par exemple)",
      so: "afficher correctement les ligatures, les formes contextuelles et le sens de droite à gauche",
      criteria: [
        ["une fiche de chaque écriture est affichée sur web, Android et iOS", "on la contrôle", "aucun caractère manquant (tofu), formes arabes et ligatures indiennes correctes"],
        ["on affiche une forme contextuelle arabe isolée", "", "elle est rendue fidèlement (caractère de liaison zero-width joiner ou glyphe dédié)"]
      ]
    },
    {
      id: "TS-016", type: "TS", epic: "E9", priority: "M", points: 2, status: "doing",
      title: "Gestion des licences et des attributions",
      as: "équipe technique",
      want: "conserver la source, l'auteur et la licence de chaque donnée et de chaque audio",
      so: "respecter les licences CC BY-SA et CC BY et afficher les attributions",
      criteria: [
        ["un contenu est publié", "on consulte ses métadonnées", "la source, l'auteur et la licence sont présents et la page À propos se génère à partir de ces métadonnées"]
      ]
    },
    {
      id: "TS-017", type: "TS", epic: "E5", priority: "S", points: 3, status: "todo",
      title: "Index de recherche côté client (Pagefind)",
      as: "équipe technique",
      want: "un index de recherche statique généré par Pagefind (langues, endonymes, caractères, sons)",
      so: "chercher sans serveur",
      criteria: [
        ["l'index est généré à la publication", "on cherche un nom de langue accentué ou non", "le résultat est trouvé, avec normalisation Unicode (NFC) et insensibilité aux accents"]
      ]
    },
    {
      id: "TS-018", type: "TS", epic: "E9", priority: "S", points: 3, status: "todo",
      title: "Accessibilité (WCAG 2.2 AA)",
      as: "équipe technique",
      want: "respecter les critères WCAG 2.2 de niveau AA",
      so: "que Tongo soit utilisable par tous",
      criteria: [
        ["une page est livrée", "on l'audite", "contrastes, navigation au clavier, libellés des boutons audio et attribut de langue (lang) des glyphes sont conformes"]
      ]
    },
    {
      id: "TS-019", type: "TS", epic: "E9", priority: "S", points: 2, status: "todo",
      title: "CI/CD : build, validation et déploiement statiques",
      as: "équipe technique",
      want: "une chaîne GitHub Actions qui valide le contenu, construit le site et le déploie (Cloudflare Pages ou GitHub Pages)",
      so: "publier une nouvelle version du contenu sans intervention manuelle",
      criteria: [
        ["une nouvelle version du contenu est poussée", "la CI s'exécute", "le contenu est validé contre le schéma, le site est construit et mis à jour automatiquement, sans serveur applicatif"],
        ["la validation échoue", "", "le déploiement est bloqué et l'erreur est lisible"]
      ]
    },
    {
      id: "TS-020", type: "TS", epic: "E9", priority: "M", points: 3, status: "done",
      title: "Initialisation de l'appli (Astro + TypeScript)",
      as: "équipe technique",
      want: "un projet Astro en génération statique, avec du JavaScript seulement là où c'est utile (React reste possible pour des îlots plus riches, D24) et un routage par langue",
      so: "poser le socle de l'appli web et mobile",
      criteria: [
        ["le projet est initialisé", "on lance le build", "une page par langue d'interface est générée (/fr/, /en/…), sans JavaScript chargé sur les pages qui n'en ont pas besoin"],
        ["une langue d'interface s'écrit de droite à gauche", "on affiche une page", "la balise html porte dir=\"rtl\" et la mise en page s'inverse"]
      ]
    },
    {
      id: "TS-021", type: "TS", epic: "E9", priority: "S", points: 2, status: "todo",
      title: "PWA installable (sans hors-ligne)",
      as: "équipe technique",
      want: "un manifeste et un service worker minimal (@vite-pwa/astro)",
      so: "que Tongo s'installe sur l'écran d'accueil d'un mobile, le mode hors ligne étant reporté (D16)",
      criteria: [
        ["j'ouvre Tongo sur Android ou iOS", "je choisis « Ajouter à l'écran d'accueil »", "Tongo s'installe avec son icône et s'ouvre en plein écran"]
      ]
    },
    {
      id: "TS-022", type: "TS", epic: "E7", priority: "M", points: 3, status: "doing",
      title: "Initialisation de la chaîne de production (TypeScript)",
      as: "équipe technique",
      want: "un paquet TypeScript (tsx, Zod, Vitest) avec une commande par étape : import, agrégation, croisement, export (D24)",
      so: "produire le contenu de façon reproductible",
      criteria: [
        ["le projet est initialisé", "on lance la chaîne complète sur une langue", "les étapes s'enchaînent et produisent des JSON valides au regard du schéma Zod partagé avec l'appli"],
        ["le contenu de départ est écrit à la main", "on lance « npm run seed » puis « npm run validate »", "les fichiers de content/ sont générés et validés ; ils restent marqués « brouillon » tant qu'aucune source ne les confirme"]
      ]
    },
    {
      id: "TS-023", type: "TS", epic: "E7", priority: "M", points: 3, status: "todo",
      title: "Client LLM économique (Claude Haiku 5.5, en batch)",
      as: "équipe technique",
      want: "appeler Claude Haiku 5.5 par l'API Message Batches, avec structured outputs (schémas Pydantic) et prompt caching",
      so: "produire le contenu au coût le plus bas (D17)",
      criteria: [
        ["une langue est traitée", "le lot est terminé", "les résultats sont associés par identifiant de requête, validés contre le schéma, et les requêtes en erreur ou refusées sont listées pour être relancées"],
        ["un lot est lancé", "", "le nombre de tokens et le coût estimé sont journalisés"]
      ]
    },
    {
      id: "TS-024", type: "TS", epic: "E8", priority: "S", points: 2, status: "todo",
      title: "Stockage des fichiers audio",
      as: "équipe technique",
      want: "stocker les audios hors du dépôt git (Cloudflare R2 ou Git LFS)",
      so: "garder un dépôt léger malgré le volume audio",
      criteria: [
        ["les audios d'une langue sont générés", "on les publie", "ils sont servis depuis le stockage choisi, avec des URL stables référencées dans le contenu"]
      ]
    }
  ]
};
