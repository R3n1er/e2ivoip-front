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
