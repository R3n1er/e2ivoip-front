# Charte Graphique Officielle E2I VoIP

## 🎨 Couleurs Principales

### Rouge Principal

- **Code hexadécimal** : #E53E3E
- **RGB** : 229, 62, 62
- **Utilisation** :
  - Chiffre "2" dans E2I
  - Lettres "IP" dans VOIP
  - Hover sur les lettres E/I
  - Boutons CTA
  - Liens au survol
  - Éléments d'accent

### Bleu Marine

- **Code hexadécimal** : #2D3848
- **RGB** : 45, 56, 72
- **Utilisation** :
  - Lettres E et I dans E2I
  - Éléments d'accent secondaires
  - Informations importantes

### Gris Secondaire

- **Code hexadécimal** : #818096
- **RGB** : 129, 128, 150
- **Utilisation** :
  - Lettres "VO" dans VOIP
  - Baseline et textes secondaires
  - Éléments de navigation secondaires

### Gris Foncé

- **Code hexadécimal** : #1F2937
- **RGB** : 31, 41, 55
- **Utilisation** :
  - Texte principal
  - Version non scrolled du header
  - Éléments de contenu importants

### Blanc

- **Code hexadécimal** : #FFFFFF
- **RGB** : 255, 255, 255
- **Utilisation** :
  - Fond clair
  - Inversions de couleurs
  - Version scrolled du header

## 🎨 Teintes dérivées (ajoutées le 2026-09-21)

> Extension validée explicitement par Alban. Les cinq couleurs principales
> ci-dessus restent inchangées : ces teintes en dérivent et ne s'y substituent
> jamais.

Ce sont des **fonds uniquement** — trop claires pour porter du texte. L'accent
reste le rouge principal, le bleu marine reste structurel.

| Teinte | Hex | Token | Utilisation |
|---|---|---|---|
| Rouge très clair | `#FDECEC` | `red-primary-50` | Fonds de badges et callouts |
| Rouge clair | `#FAD4D4` | `red-primary-100` | Fonds d'icônes (pastilles rondes) |
| Marine très clair | `#EEF1F5` | `blue-marine-50` | Fonds de sections alternées |
| Marine clair | `#D8DEE7` | `blue-marine-100` | Fonds d'icônes, bordures douces |

## ⚙️ Gris d'interface (hors charte de marque)

> Ce ne sont **pas** des couleurs de marque : ce sont des valeurs
> fonctionnelles, nommées pour éviter les utilitaires Tailwind bruts. Elles
> suivent la rampe de `gray-dark`, lui-même identique au `gray-800` de
> Tailwind.

| Valeur | Hex | Token | Contraste / blanc | Utilisation |
|---|---|---|---|---|
| Gris texte secondaire | `#4B5563` | `ui-muted` | 7,56:1 — AA | Navigation niv. 2-3, corps de texte |
| Gris bordure | `#E5E7EB` | `ui-border` | — | Séparateurs, bordures |
| Surface claire | `#F9FAFB` | `ui-surface` | — | Fond de section alterné au blanc |
| Surface marquée | `#F3F4F6` | `ui-surface-2` | — | Fond de section plus soutenu |

### Exceptions d'accessibilité assumées

Deux couleurs hors charte sont **délibérément conservées**, parce qu'un token
de charte y dégraderait le contraste :

| Classe | Hex | Contraste | Le token échouerait |
|---|---|---|---|
| `text-red-600` | `#DC2626` | **4,83:1** — AA OK | `red-primary` : 4,13:1, sous le seuil |
| `hover:text-red-700` | `#B91C1C` | **6,47:1** — AA OK | idem, sur le lien « Espace client » du footer |

La conformité ne prime pas sur la lisibilité : un texte conforme et illisible
est un défaut, pas une réussite.

## 🏷️ Application dans l'Identité Visuelle

### Logo E2I VoIP

```
E2I VOIP
│ │ │ │ │
│ │ │ │ └─ IP : Rouge principal (#E53E3E)
│ │ │ └─── O : Gris secondaire (#818096)
│ │ └───── V : Gris secondaire (#818096)
│ └─────── 2 : Rouge principal (#E53E3E)
└───────── E : Bleu marine (#2D3848)
          I : Bleu marine (#2D3848)
```

### Éléments d'Interface

#### Header

- **Version normale** : Gris foncé (#1F2937)
- **Version scrolled** : Blanc (#FFFFFF)

#### Boutons et Actions

- **Boutons CTA** : Rouge principal (#E53E3E)
- **Liens hover** : Rouge principal (#E53E3E)
- **Boutons secondaires** : Bleu marine (#2D3848)

#### Typographie

**Police officielle : Inter** — cohérente avec le logo E2I VoIP (dessiné en Inter).
Police conçue pour les écrans, optimale en lisibilité web. Chargée via
`next/font/google` dans `app/layout.tsx`.

- **Texte & titres** : Inter (toutes graisses)
- **Données chiffrées** (stats, tarifs, compteurs) : IBM Plex Mono +
  `tabular-nums` — effet « télécom/data », alignement des chiffres
- **Interdit** : police serif sur l'UI produit

Couleurs typographiques :

- **Titre principal** : Gris foncé (#1F2937)
- **Sous-titres** : Bleu marine (#2D3848)
- **Texte principal** : Gris foncé (#1F2937)
- **Texte secondaire** : Gris secondaire (#818096)

## 🛠️ Utilisation Technique

### Classes Tailwind CSS

```css
/* Couleurs principales */
.text-red-primary     /* Rouge principal */
/* Rouge principal */
.bg-red-primary      /* Fond rouge principal */
.text-blue-marine    /* Bleu marine */
.bg-blue-marine      /* Fond bleu marine */
.text-gray-secondary /* Gris secondaire */
.bg-gray-secondary   /* Fond gris secondaire */
.text-gray-dark      /* Gris foncé */
.bg-gray-dark; /* Fond gris foncé */
```

### Variables CSS

```css
:root {
  --red-primary: #e53e3e;
  --blue-marine: #2d3848;
  --gray-secondary: #818096;
  --gray-dark: #1f2937;
  --white: #ffffff;
}
```

### Thème DaisyUI

```javascript
e2ivoip: {
  "primary": "#E53E3E",        // Rouge principal
  "secondary": "#818096",      // Gris secondaire
  "accent": "#2D3848",         // Bleu marine
  "neutral": "#1F2937",        // Gris foncé
  "base-100": "#FFFFFF",       // Blanc
}
```

## 📱 Responsive et Accessibilité

### Contraste

- **Rouge principal sur blanc** : Contraste élevé ✅
- **Bleu marine sur blanc** : Contraste élevé ✅
- **Gris foncé sur blanc** : Contraste élevé ✅
- **Gris secondaire sur blanc** : Contraste moyen ⚠️

### Recommandations d'Accessibilité

- Utiliser le rouge principal uniquement pour les éléments d'accent
- Maintenir un contraste suffisant pour le texte principal
- Éviter les combinaisons de couleurs qui réduisent la lisibilité

## 🎯 Exemples d'Utilisation

### Section Héro

```jsx
<section className="bg-gradient-to-r from-red-primary to-blue-marine">
  <h1 className="text-white">E2I VoIP</h1>
  <p className="text-white/90">Solutions de téléphonie IP</p>
</section>
```

### Bouton CTA

```jsx
<button className="bg-red-primary hover:bg-red-700 text-white">
  Demander un devis
</button>
```
