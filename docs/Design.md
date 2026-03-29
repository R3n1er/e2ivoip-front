# Principes de Design UX/UI - E2I VoIP (Standard B2B 2026)

Ce document répertorie les principes fondateurs et les motifs de conception (Design Patterns) appliqués à l'interface de l'application E2I VoIP, afin de garantir une expérience utilisateur à la fois statutaire, premium et moderne.

Ces règles sont complémentaires à la charte colorimétrique stricte définie dans `docs/CHARTE_GRAPHIQUE.md`.

---

## 🟩 1. Philosophie Carrée ("Square Philosophy")

Afin de contraster avec les designs génériques grand public ou générés par IA (qui abusent des fortes courbes `rounded-2xl` et `rounded-full`), E2I VoIP adopte une ligne solide, professionnelle et ancrée, à l'image des blocs de son propre logo.

*   **Règle absolue** : Les conteneurs, les cartes de contenu, les boutons d'action (CTA) contextuels et les modules (comme le Chat) DOIVENT utiliser la classe Tailwind `rounded-none`.
*   **Exceptions tolérées** : Les éléments purement circulaires prévus pour encapsuler des icônes ou des avatars (utilisation exclusive de `rounded-full`). Les angles légèrement adoucis (`rounded-sm`) ne sont tolérés que sur des éléments minuscules ne pouvant souffrir d'arêtes trop dures visuellement (ex: badges/puces textuels).

## 🍱 2. Structure Bento Box (Grilles Asymétriques)

Pour rompre la monotonie des grilles standards (`grid-cols-3` uniformes), l'application privilégie des compositions organiques et rythmées grâce au composant CSS Layout "Bento".

*   **Composants associés** (implémentés dans `globals.css`) :
    *   `.bento-grid` : Conteneur principal gérant le gap et le colonnage (généralement 4 colonnes sur les grilles denses).
    *   `.bento-item` : Tuile standard (1x1).
    *   `.bento-item-large` : Grande tuile occupant 2 colonnes et 2 lignes (2x2), idéale pour l'offre "star" ou populaire.
    *   `.bento-item-wide` : Tuile large occupant 2 colonnes (2x1), excellente pour casser la lecture verticale.
*   **Application** : Utilisé de manière privilégiée pour présenter les services (ex: `services-section-simple.tsx`), les points forts ou les cas d’usage.

## 📐 3. Hero Asymétrique et Décors B2B

Les sections primaires (Hero) ne reposent plus sur la traditionnelle grande image de fond sombre (voile noir/gradient sombre texté au milieu).
Elles sont remplacées par une structure asymétrique (Web 2026) :

*   **Séparation des blocs** : Une colonne gauche dédiée à l'impact typographique (titres majeurs, appels à l'action) et une colonne droite pour le visuel.
*   **Blocs décoratifs ("Square Decors")** : Au lieu de halos flous colorés capricieux, l'interface emploie des décalages architecturaux :
    *   Bordures très épaisses en décalage derrière les images simples (`border-[40px] border-red-primary/5`).
    *   Fonds biseautés discrets (`skew-x-[-5deg] bg-blue-marine/5`).
    *   Motifs géométriques (`pattern-dots`).

## 🎨 4. Stricte conformité Charte Graphique (No Generic Colors)

Toute la colorimétrie de l'interface doit pivoter *exclusivement* autour des variables définies dans `CHARTE_GRAPHIQUE.md`.

*   **Dégradés proscrits** : Les fonds arc-en-ciel, `pink-to-indigo`, ou `red-to-green` en vogue ces dernières années sont strictement bannis.
*   **Dégradés autorisés** : Toujours bâtis à partir des tons de l'image de marque. Exemples autorisés :
    *   `bg-gradient-to-br from-red-primary to-blue-marine` (ex: bouton de chat).
    *   `bg-gradient-to-r from-gray-50 to-white` (cartes secondaires).
*   **Fonds de carte intelligents** : Pour démarquer visuellement des cartes Bento sans sortir de la charte :
    *   Blanc pur pour la neutralité (`bg-white`).
    *   Gris extrêmement clair pour le contraste (`bg-gray-50`).
    *   Fonds foncés pour l'impact (`bg-blue-marine text-white` ou `bg-gray-dark text-white`).

## 🪞 5. Glassmorphism unifié

Le Glassmorphism (effets de transparence floutés) demeure utilisé mais de façon stricte pour éviter l'effet "Brouillon".
*   Applicable pour les badges flottants (floating cards sur les Hero) ou le fond du menu de navigation sticky.
*   Conception : Une couleur de charte avec opacité (ex: `bg-white/10` ou `bg-blue-marine/80`) couplée à un `backdrop-blur-md` et un `border` très discret (ex: `border-white/20`).

## 🔵 6. Design System "Stitch Redesign 2026" (Macromotifs)

La nouvelle version de la **Home Page** et les maquettes itérées dans *Google Stitch* (Projet "E2I VoIP - Redesign 2026") consolident l'identité B2B au travers d'une alternance binaire stricte des arrière-plans majeurs :

*   **Le Fond Bleu Marine (`bg-blue-marine`)** : Vecteur d'autorité et de confiance IT. Il est utilisé pour les blocs institutionnels (Footer, sections de réassurance) et pour encapsuler les offres "Premium" nécessitant un fort impact visuel (comme la solution 3CX PRO). Les textes y sont systématiquement en blanc.
*   **Le Fond Blanc Pur (`bg-white`)** : Vecteur de clarté. Il est réservé à la présentation détaillée, claire et aérée des services (Trunk SIP, fonctionnalités) et permet de faire ressortir avec une puissance maximale le Rouge Principal E2I (`text-red-primary`) sur les boutons CTA "Contact" ou "Devis en ligne".
*   Cette dualité **Bleu/Blanc** structure la narration de la page et évite de noyer l'utilisateur dans une succession d'informations de même niveau.

---

## 🏛️ 7. Documentation du Design System : Précision Architecturale

### 7.1. Vue d'ensemble & Ligne Directrice Créative (Creative North Star)

La Ligne Directrice Créative absolue de ce système est **"Le Monolithe Numérique" (The Digital Monolith)**.

Dans un paysage numérique saturé d'esthétiques technologiques "douces" et de bulles arrondies, ce système prend massivement position à travers le **Structuralisme Brutaliste**. Nous ne concevons pas des pages ; nous construisons des infrastructures. Chaque mise en page doit paraître aussi immuable et performante qu'une baie de serveurs télécom.

Pour casser l'aspect "template" ("modèle générique"), nous employons une **asymétrie architecturale intentionnelle**. Cela implique d'exploiter des blocs de couleurs très contrastés et un espacement typographique serré pour créer une sensation de poids physique écrasant. Nous nous éloignons des motifs web basiques en utilisant strictement un `border-radius: 0px` à travers tout l'écosystème, exigeant une rigueur d'alignement au pixel près évoquant les plans d'un maître architecte.

### 7.2. Stratégie de Couleur : Tectonique à Haut Contraste

La palette est construite sur un contraste extrême pour refléter l'alternance rythmique entre puissance et clarté.

#### La Règle du "Sans-Ligne" (The No-Line Rule)
**Instruction explicite :** Il est interdit d'utiliser des bordures pleines de 1px (`border-1`) pour cloisonner des sections. Les limites et séparations doivent être définies **uniquement par des changements de couleur d'arrière-plan**.
*   Utiliser des sections de niveau de contraste bas (`bg-gray-50`) posées sur un arrière-plan principal pour définir les zones de contenu aérées.
*   Utiliser des blocs à très fort impact en teinte inversée (`bg-[#1F2937]` ou `#2D3848`) pour créer l'effet "Monolithe" — de grandes dalles sombres qui forcent l'attention.

#### Hiérarchie des Surfaces & Imbrication
Traitez l'interface utilisateur comme une série de dalles architecturales empilées.
*   **Base :** Le fond principal clair ou gris subtil.
*   **Éléments flottants :** Utiliser le Blanc Pur (`bg-white`) pour les cartes ou les panneaux, afin de créer un rendu d'une précision chirurgicale et "décolorée".
*   **Éléments encastrés :** Utiliser une surface légèrement nuancée (ex: `bg-gray-100`) pour les fonds de formulaires ou les zones en creux.

#### La "Texture Signature"
Bien que l'esthétique soit stricte et brutale, la page ne doit pas paraître inanimée. Sur les CTA primaires les plus importants et les héros visuels, utiliser un subtil dégradé de notre couleur primaire (`#E53E3E`) vers une teinte très proche mais incandescente, selon un angle fort (135 degrés). Cela dote cette structure rigide d'une "âme" ou d'une énergie sous-jacente.

### 7.3. Typographie : La Voix Dominante

Nous n'utilisons pas la typographie B2B (Inter / Roboto) comme une police fonctionnelle, mais **comme un véritable matériau de construction**.

*   **Titres & Headlines :** Doivent utiliser les graisses massives **Bold (700)** ou **Black (900)**. Paramétrer l'espacement des lettres (`tracking-tight` / `letter-spacing: -0.02em`) pour créer un effet de "bloc" extrêmement dense. Ces titres sont les piliers bétons de la page ; ils doivent sembler écrasants et inébranlables.
*   **Corps de Texte (Body) :** Utiliser la graisse **Regular (400)**. Le contraste radical entre les titres compacts mastodontes et le corps de texte clair, aéré et lisible crée le style "Éditorial".
*   **Libellés de Navigation / Tags (`label-md`) :** Utiliser la graisse **SemiBold (600)** en TOUT EN MAJUSCULES (uppercase) avec un `tracking-widest` (`letter-spacing: 0.1em`) pour obtenir une signature industrielle et utilitaire.

### 7.4. Élévation & Profondeur : Superposition Tonale

Les ombres traditionnelles douces (soft shadow) sont remplacées par des **Ombres Dures (Hard Shadows)** ou de subtils **Changements Tonaux (Tonal Shifts)**.

*   **Le Principe de Superposition (Layering) :** La profondeur s'acquiert par l'empilement frontal. Déposez une dalle blanche pure sur un fond gris clair. La stricte différence de valeur hexadécimale fait naître virtuellement la bordure brute.
*   **Lignes de repli "Fantôme" :** Si, pour des raisons strictes d'accessibilité UI, un séparateur de type "ligne" s'avère indispensable, il devra s'agir d'un contour à l'opacité effacée (ex: `border-gray-secondary/10` soit 10% maximum d'opacité). Toute présence persistante d'un trait lourd est une violation de la règle du "Sans-Ligne".
*   **Le "Monolithe Flottant" (Glassmorphism Poussé) :** Pour la navigation de niveau supérieur (En-tête "Header" sticky), on utilisera une très forte surface claire opaque à 80% couplée à un puissant `backdrop-blur-xl` (`blur(20px)`). Contrairement à l'effet bulle/iOS standard, cet attribut permettra de faire visuellement "flotter un lourd plafond d'architecture de verre" de manière élégante et proéminente.

### 7.5. Composants Signatures Exclusifs

#### Les Boutons "Monolithe"
Ce sont les blocs les plus distinctifs du design E2I. Aucun dégradé doux ou reflet :
*   **Primaire :** Arrière-plan Rouge (`#E53E3E`), Texte Blanc, TOUT EN MAJUSCULES. **Ombre Dure :** `shadow-[4px_4px_0_0_#1F2937]` (Dure, opaque, aucun flou).
*   **Secondaire :** Arrière-plan Blanc Pur (`bg-white`), Texte sombre. **Ombre Dure :** `shadow-[4px_4px_0_0_#1F2937]`.
*   **États et physique (Hover) :** Au survol, la dureté s'établit physiquement en réduisant cette ombre à `2px 2px` et appliquant un `translate-x-[2px] translate-y-[2px]` pour simuler la lourde pression mécanique d'interrupteurs matériels !

#### Champs de Saisie (Inputs)
*   **Structure :** Rigueur orthogonale absolue (0px d'angles). Des arrière-plans gris très pauvres en contraste (encastrés).
*   **État Actif (Focus) :** Point de lueur sur bordure. La base acquiert une stricte fine ligne basse de couleur rouge (`#E53E3E`), simulant un soulignement énergique.
*   **Messages Erreur :** Utilisation typographique rouge sur un encart de remplissage rose d'urgence pure sans fioritures.

#### Cartes de Listes
*   **Interdit absolu :** Le lignage de base (ligne de 1px entre les items de vos listes).
*   **Solution Architecturale :** Utilisez des `margins` verticaux extrêmes (ex: `my-8` ou `space-y-8`) entre vos éléments textuels, créant de vastes respirations blanches.

#### Le Composant Star : "La Dalle de Données" (The "Data Slab")
Utilisée spécifiquement pour exposer vos records télécom / KPIs. Cette structure prend la forme d'un solide bloc `bg-white` accueillant des chiffres cyclopéens (statistiques `headline-lg` en rouge pur), accompagnés au millimètre par de petites légendes fines.
Il n'y a ni marges colorées, ni icônes d'habillage... simplement un poids typographique pur posé très brutalement et élégamment.

### 7.5bis. Le Widget Chat Monolithe ("Chat PreOverlay")

Le module de livechat est un composant flottant global integre au Design System Monolithe. Il se compose de trois elements : un bouton d'action, une animation contextuelle et un formulaire de pre-qualification.

#### Bouton de Chat
*   **Style** : Monolithe Primaire identique aux CTA principaux du site.
*   **Fond** : `bg-red-primary` (rouge plein — **pas de gradient**).
*   **Ombre Dure** : `shadow-[4px_4px_0_0_#1F2937]`.
*   **Hover** : `translate(2px, 2px)` + shadow reduite a `2px 2px` (pression mecanique).
*   **Dimensions** : `w-20 h-20` (80px x 80px).
*   **Position** : `fixed bottom-6 right-6 z-[9999]`.
*   **Coins** : `rounded-none` (Philosophie Carree stricte).
*   **Icone** : SVG chat blanc centre (36x36px).

#### Texte Accrocheur "Une question ?"
*   **Fond** : `bg-white`, `rounded-none`.
*   **Ombre Dure legere** : `shadow-[3px_3px_0_0_#1F2937]`.
*   **Typographie** : `text-xs font-black uppercase tracking-[0.2em]` (signature industrielle Stitch).
*   **Position** : Au-dessus du bouton, aligne a droite.

#### Animation — Declenchement Contextuel au Scroll
L'animation **ne demarre pas au chargement** de la page. Elle se declenche via un **Intersection Observer** lorsque l'utilisateur scrolle au-dela du Hero Section (premiere section visible). Ce declenchement contextuel respecte l'attention de l'utilisateur et evite l'agacement.
*   **Pattern** : 3s vibration (shake) + 2s pause, repete 4 fois.
*   **Duree totale** : 20 secondes apres declenchement.
*   **Arret definitif** : Apres 20s, au clic, ou a l'annulation — jamais de reprise.
*   **Accessibilite** : Respecter `prefers-reduced-motion` (desactiver si active).

#### Formulaire PreChat (Carte Monolithe)
Formulaire de pre-qualification reduit a **3 champs** pour minimiser la friction :
1.  Prenom (obligatoire)
2.  Email (obligatoire)
3.  Entreprise (obligatoire)

**Style Carte** :
*   Fond : `bg-white`.
*   Ombre Dure : `shadow-[6px_6px_0_0_#1F2937]`.
*   Largeur : `w-[320px]`.
*   Coins : `rounded-none`.
*   Border : `border border-gray-200`.

**Titre** : `font-black uppercase tracking-[0.2em] text-sm text-[#091421]` — Texte : "AVANT DE COMMENCER".

**Inputs** (Style Monolithe Adapte) :
*   Structure : `rounded-none bg-gray-50 border border-gray-200`.
*   Focus : `border-b-2 border-red-primary` (soulignement rouge energique).
*   Erreur : `text-xs text-red-primary mt-1`.

**Bouton Principal** : "OUVRIR LE CHAT" — Monolithe Primaire pleine largeur (`bg-red-primary text-white font-black uppercase tracking-[0.2em]` + hard shadow).

**Lien Annuler** : Simple texte discret `text-sm text-gray-secondary hover:text-[#091421]` centre sous le bouton — **pas de bouton secondaire**.

#### Integration HubSpot
Apres soumission du formulaire, le composant :
1.  Envoie les donnees a `/api/hubspot/ingest-conversation` (upsert contact + note).
2.  Initialise le tracking HubSpot `_hsq` avec les informations du contact.
3.  Masque le widget HubSpot Conversations natif pour eviter les conflits.

### 7.6. Les Règles "DO's & DON'Ts" Inflexibles

#### ☑️ À FAIRE IMPÉRATIVEMENT (DO)
*   **OUI :** Abusez d'écarts et marges massives (`py-16`, `py-20`) pour séparer les macro-sections afin d'obtenir un aspect "Aéré" (dans le Header) et très très "Institutionnel" (pour vos Footers de pages).
*   **OUI :** Assurez-vous mécaniquement et via l'outil du développeur que tous les rayons d'angles terminent bien et toujours sur un sec `0px`.
*   **OUI :** Insérez des blocs massifs assombris (`text-white` sur fond foncé) pour venir caler/peser lourdement en bas de page pour emprisonner le regard dans votre "Zone de Conversion" sans retour possible.

#### ❌ À PROSCRIRE IMPÉRATIVEMENT (DON'T)
*   **NON :** Pas de lignes séparatrices de 1px (`border-[1px]`). C'est aux puissances de couloirs et blocs de couleurs du fond (Noir ou Blanc) de découper vos sections visuelles. Ne tirez pas de traits de repères !
*   **NON :** Pas de douces et floues ombres de boutons. Le bouton du "Monolithe" a des ombres coupantes comme des lames (hard-box shadow).
*   **NON :** Pas d'espacement standardisé sur les Gros Titres. C'est l'étouffement textuel imposant le bloc (le **serrage de caractères**) qui donne ce sentiment de supériorité et de stabilité. Les lettres du titre de la page doivent quasiment se toucher, presque à la tension !
*   **NON :** N'employez aucune iconographie douillette ou arrondie. L'esthétique réclame de la netteté et des pictogrammes géométriques, chirurgicaux et acérés afin de répondre strictement à la "Précision Architecturale".
