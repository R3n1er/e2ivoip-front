# Phase 2: Redesign + Social Proof + Conversion - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-05
**Phase:** 02-redesign-social-proof-conversion
**Areas discussed:** Placement & contenu social proof, Strategie CTA & conversion, Liens telephone cliquables, Fix Design System

---

## Placement & contenu social proof

### Placement homepage

| Option | Description | Selected |
|--------|-------------|----------|
| Entre Hero et Transformation | Impact immediat, credibilite des le premier scroll | |
| Remplacer ClientsCarousel | Plus percutant que des logos, evite une section supplementaire | |
| Apres Services, avant Stats | Pattern classique : offre d'abord, puis rassurer | ✓ |

**User's choice:** Apres Services, avant Stats
**Notes:** Logique argumentaire : presenter l'offre puis rassurer avec des temoignages.

### Badge 3CX Certified

| Option | Description | Selected |
|--------|-------------|----------|
| Integre dans la section temoignages | Badge en haut de section, micro-label Monolithe | |
| Strip separe au-dessus des temoignages | Bande horizontale dediee, visuellement distincte | ✓ |
| Dans PartnersSection existante | DRY, ajout dans la section existante | |

**User's choice:** Strip separe au-dessus des temoignages

### Contenu temoignages

| Option | Description | Selected |
|--------|-------------|----------|
| Garder les 3 actuels | Bonne diversite de territoires et secteurs | |
| Modifier/ajouter des temoignages | Vrais temoignages a integrer ou modifier le contenu | ✓ |
| Externaliser les donnees | Sortir vers fichier JSON pour mises a jour futures | |

**User's choice:** Modifier/ajouter des temoignages — l'utilisateur a de vrais temoignages clients a fournir

### Scope pages

| Option | Description | Selected |
|--------|-------------|----------|
| Homepage uniquement | REQUIREMENTS PROOF-01 specifie la homepage | |
| Homepage + pages produit cles | Ajouter sur /telephonie-3cx, /3cx-cloud, /nos-services | ✓ |

**User's choice:** Homepage + pages produit cles

---

## Strategie CTA & conversion

### CTA primaire pages produit

| Option | Description | Selected |
|--------|-------------|----------|
| Devis en ligne | CTA uniforme 'Demander un devis' vers /devis-en-ligne | |
| Contact direct | CTA 'Nous contacter' vers /contact | |
| Varier selon la page | CTA adapte au contexte de chaque page | ✓ |

**User's choice:** Varier selon la page

### Personnalisation CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Wording personnalise, meme destination | Texte adapte mais tous vers /devis-en-ligne | |
| Wording + destination personnalises | Texte ET lien adaptes avec query params pour tracking | ✓ |
| Tu decides | Claude choisit le meilleur wording par page | |

**User's choice:** Wording + destination personnalises (avec query params type ?service=3cx)

### Elimination des dead-ends

| Option | Description | Selected |
|--------|-------------|----------|
| ContactSectionSimple en bas de chaque page | Reutiliser composant existant | ✓ |
| CTA footer flottant | Bande fixe en bas de page | |
| CTA inline dans le contenu | CTAs contextuels a mi-page | |

**User's choice:** ContactSectionSimple en bas de chaque page

### Fix CTAButton

| Option | Description | Selected |
|--------|-------------|----------|
| Refactorer en Link-only | Supprimer button, .monolith-btn sur Link | ✓ |
| Garder CTAButton mais fix | Remplacer button par span | |

**User's choice:** Refactorer CTAButton en Link-only

---

## Liens telephone cliquables

### Numeros

| Option | Description | Selected |
|--------|-------------|----------|
| Un seul numero principal | Simple, un point d'entree | |
| Numeros par territoire | Un numero par zone DOM | ✓ |
| Tu decides | Utiliser les numeros deja dans le code | |

**User's choice:** Numeros par territoire

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Header | Dans la barre de navigation | |
| Footer | Dans le pied de page | ✓ |
| Pages contact/devis | Mis en avant sur /contact et /devis-en-ligne | ✓ |
| Chaque page produit | Dans le CTA ou section contact | ✓ |

**User's choice:** Footer + Pages contact/devis + Chaque page produit (pas dans le header)

---

## Fix Design System

### Strategie de correction

| Option | Description | Selected |
|--------|-------------|----------|
| Corriger au fil de l'eau | Fix quand on touche le composant | |
| Audit + fix dedie d'abord | Scan complet puis fix en bloc avant la suite | ✓ |
| Tu decides | Claude choisit la strategie | |

**User's choice:** Audit + fix dedie d'abord

### Hover CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Hard shadow shift | Translate + shadow offset, philosophie Monolithe mecanique | ✓ |
| Border/underline animation | Plus subtil, moins Monolithe | |
| Tu decides | Claude implemente le hover du .monolith-btn existant | |

**User's choice:** Hard shadow shift

---

## Claude's Discretion

- Structure de donnees exacte pour les temoignages
- Wording CTA exact par page (review au PR)
- Implementation technique du strip badge 3CX
- Format d'affichage des numeros par territoire

## Deferred Ideas

None — discussion stayed within phase scope
