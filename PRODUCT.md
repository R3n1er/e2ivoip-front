# Product

> **Source :** synthèse de `docs/BrandBrief_e2ivoip.md`, `docs/ligne-editoriale.md`, `docs/PRD.md` et des décisions actées (memory.md, DESIGN.md §8).
> **Complément visuel :** `DESIGN.md` (racine) — ce document répond au *pourquoi*, DESIGN.md au *comment*.
> **Précédence :** `docs/CHARTE_GRAPHIQUE.md` > `DESIGN.md` > ce document pour toute question visuelle.
> **Dernière mise à jour :** 2026-08-09

## Register

brand

> Surface principale : site vitrine B2B de conversion (heroes, pages services, contenus SEO long-form, CTA devis). Le design *est* le produit.
> **Exception documentée :** si un espace client / dashboard / back-office est ajouté un jour, ces surfaces se traitent en registre `product` au cas par cas. Le défaut du projet reste `brand`.

## Users

**Cible principale — décideurs non-techniciens.** Dirigeants, DAF, office managers et responsables IT généralistes de TPE (dès 3 utilisateurs) jusqu'aux groupes multisites (60 à 90+ utilisateurs). Implantés aux Antilles-Guyane, à La Réunion ou en France métropolitaine.

**Leur contexte :** ils subissent une contrainte technique qu'ils n'ont pas choisie — arrêt du réseau cuivre, déploiement fibre, PABX en fin de vie. Ils doivent choisir un prestataire télécom sans maîtriser le sujet, souvent en comparant 2 ou 3 devis. Ils arrivent sur le site avec une question de coût et une inquiétude de continuité de service.

**Le travail à accomplir :** comprendre vite si E2I peut répondre à leur cas, se rassurer sur la fiabilité et la proximité du support, obtenir un devis. Leurs besoins déclarés : réduire les coûts, centraliser les appels entre agences éloignées (y compris DROM ↔ métropole), travailler avec un intégrateur local qui maîtrise les contraintes techniques des DROM.

**Secteurs sur-représentés :** santé et médico-social (cliniques, EHPAD, maisons de santé), juridique et expertise (avocats, experts-comptables, bureaux d'études), commerce et distribution multisites, collectivités et administrations, hôtellerie-restauration, BTP, industrie.

**Cible secondaire — intégrateurs et agences d'agents vocaux IA.** Agences, freelances et builders (1 à 15 personnes), maturité technique intermédiaire à senior, métropole ou DOM. Ils cherchent du trunk SIP BYOC et des numéros locaux DOM (+590, +594, +596, +262) pour brancher VAPI, Rounded, ElevenLabs ou Jambonz. Profil technique : vocabulaire précis, orienté compatibilité plateforme et mise en production. Ce segment ne partage ni le niveau de vulgarisation ni les objections de la cible principale.

## Product Purpose

E2I VoIP est un **opérateur de services télécom et intégrateur VoIP**, spécialiste de la téléphonie IP dans les DOM, avec plus de 15 ans d'activité. Le catalogue couvre le Trunk SIP (au compteur et illimité), les IPBX cloud 3CX et Yeastar, les assistants vocaux IA, et l'enregistrement studio de messages d'accueil.

**Ce que le site doit accomplir :** qualifier et convertir. Un visiteur doit comprendre en une visite (a) que E2I opère réellement dans sa zone géographique, (b) que la migration sera accompagnée et non subie, (c) quelle offre correspond à sa taille. Puis demander un devis.

**Définition du succès :** la demande de devis qualifiée. Pas le volume de trafic, pas le temps passé sur la page. Une page qui informe sans convertir a échoué ; une page qui convertit un prospect hors cible aussi.

**Différenciateurs à porter :** seul opérateur avec Trunk SIP dédiés Antilles-Guyane et La Réunion ; Customer Success Manager attitré à chaque client ; support technique interne assuré par des techniciens présents localement ; hébergement souverain France/UE conforme RGPD ; partenaire certifié 3CX et Yeastar.

## Brand Personality

**Fiable, proche, pédagogue.**

**Voix :** professionnelle mais accessible. L'expertise technique est systématiquement vulgarisée — le vocabulaire métier est expliqué, jamais exhibé. Phrases courtes. Bénéfice client avant caractéristique technique. Chiffres concrets plutôt qu'adjectifs.

**Émotion visée :** la confiance tranquille. Le visiteur doit se dire « ces gens connaissent mon terrain, et ils répondront quand j'appellerai ». Jamais l'urgence, jamais l'excitation technologique, jamais la pression commerciale.

**Ancrage local assumé.** La présence DOM n'est pas un argument parmi d'autres : c'est la raison d'être. Le ton reste proche et humain, à l'opposé du corporate télécom impersonnel.

**Slogan :** « La téléphonie d'entreprise, simple et évolutive ».

## Anti-references

**Le SaaS-startup générique.** Pas de blobs colorés, de néons, de dégradés arc-en-ciel, de glassmorphism décoratif, d'illustrations isométriques violettes. E2I est un opérateur télécom, pas une jeune pousse levant des fonds.

**Le hype IA.** Les agents vocaux IA sont une offre du catalogue, pas le positionnement de la marque. Aucune esthétique « AI-first » (halos, particules, dégradés violet-cyan). À ne pas promettre : E2I ne conçoit pas les workflows IA, ne fournit ni LLM ni STT/TTS, et ne vend pas d'assistant vocal clé en main.

**L'opérateur télécom historique** (type Orange Business, SFR Business). Corporate froid, jargon opérateur, parcours labyrinthiques, ton institutionnel désincarné. E2I gagne précisément sur la proximité que ces acteurs n'ont pas.

**Le hero-metric template.** Pas de « -30 % » en chiffre géant avec stats satellites et accent dégradé. Le cliché SaaS par excellence.

**Les promesses invérifiables.** Décision actée le 2026-06-11 : aucune communication sur le nombre de clients ; pas de « 24/7 » ni de « support local réactif » pour le support humain (le support est communiqué comme « par mail et téléphone ») ; les mentions 24/7 restent réservées au produit (agents IA, monitoring, uptime). Aucune adresse, aucun témoignage, aucun chiffre placeholder ne doit être publié.

## Design Principles

1. **Le terrain avant la technologie.** La spécificité DOM est l'argument numéro un, présent dès le premier écran — jamais relégué en bas de page. Un visiteur guadeloupéen doit se reconnaître avant de lire une fiche technique.

2. **Vulgariser sans infantiliser.** Le lecteur est un décideur compétent dans son métier et novice en télécom. On explique le Trunk SIP ; on ne lui explique pas ce qu'est une entreprise. Une seule couche sémantique par idée : ne jamais répéter la même promesse entre le badge, le titre et le paragraphe.

3. **Ne promettre que le vérifiable.** Chaque chiffre publié doit tenir devant un client en rendez-vous. En cas de doute sur une donnée, on la retire plutôt que de l'arrondir.

4. **Une seule couleur d'action.** Le rouge signale ce sur quoi on clique ; le marine structure. Jamais l'inverse, jamais un second accent concurrent sur le même écran.

5. **La sobriété comme preuve de sérieux.** Un opérateur télécom se juge sur sa fiabilité, pas sur ses animations. Le mouvement sert la compréhension (hiérarchie, feedback tactile) ou n'existe pas. Une page qui a l'air chère à produire inquiète plus qu'elle ne rassure.

## Accessibility & Inclusion

**Cible : WCAG 2.2 niveau AA.**

Justification : les cibles santé, médico-social et collectivités impliquent des acheteurs publics et parapublics, chez qui l'accessibilité est fréquemment un critère de sélection.

**Contraintes connues à respecter :**
- `gray-secondary` (`#818096`) sur blanc présente un contraste moyen — réservé aux métadonnées et aux baselines, jamais aux paragraphes longs
- `red-primary` (`#E53E3E`) réservé aux accents et CTA, jamais aux grands blocs de texte
- Pas de `#000000` pur — `gray-dark` (`#1F2937`) est le noir du site
- Le sens ne doit jamais reposer sur la couleur seule (statuts, validations de formulaire)
- Respect de `prefers-reduced-motion` sur toutes les apparitions au scroll et micro-interactions
- Contenu en français : accents et diacritiques obligatoires, y compris sur les capitales et les CTA
