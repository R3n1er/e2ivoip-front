# Audit de refonte — E2I VoIP
**Date** : 2026-05-16  
**Périmètre** : 22 pages, charte graphique, cohérence navigation

---

## Résumé exécutif

| Catégorie | Statut |
|---|---|
| Hero gradient (pages avec photo) | ✅ Conforme (6/6 pages concernées) |
| Couleurs hors charte | ⚠️ 85 occurrences dans les pages |
| Navigation — liens cassés | 🔴 3 liens incohérents |
| Hero sections sans photo | ⚠️ Gradient non standardisé |
| Couleurs totalement hors charte (orange/vert/violet) | 🔴 Présentes sur 4 pages |

---

## 1. Charte graphique — Référentiel de conformité

La charte définit **5 couleurs uniquement** :

| Couleur | Hex | Classe custom |
|---|---|---|
| Rouge principal | #E53E3E | `red-primary` (≈ Tailwind `red-500`) |
| Bleu marine | #2D3848 | `blue-marine` |
| Gris secondaire | #818096 | `gray-secondary` |
| Gris foncé | #1F2937 | `gray-dark` |
| Blanc | #FFFFFF | `white` / `white-primary` |

**Hero gradient officiel (CLAUDE.md)** :  
`bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`

---

## 2. Audit page par page

### Homepage (`/`)
- **Hero** : ✅ Gradient conforme (`from-blue-900/85 via-blue-800/80 to-red-600/85`)
- **Fond page** : ⚠️ `bg-gradient-to-br from-white via-gray-50 to-white` — gris léger non défini dans la charte mais acceptable
- **Accents texte hero** : ⚠️ `text-red-400` (#f87171) utilisé à la place de `red-primary` (#E53E3E)
- **Icônes stats** : ⚠️ `text-red-400` au lieu de `text-red-primary`
- **Contenu** : Complet — H1 ✅, CTAs ✅, carousel clients ✅, témoignages ✅
- **Erreurs console** : 3 erreurs webpack côté client (non bloquantes en prod)

### Nos services (`/nos-services`)
- **Hero** : 🔴 `bg-gradient-to-r from-red-50 to-white-primary` — ne respecte PAS le gradient officiel (pas de photo, pas de dégradé bleu→rouge)
- **Couleurs** : ✅ Utilise correctement `red-primary` et `blue-marine`
- **Contenu** : Complet — liste services, CTA section finale ✅
- **Note** : Hero "blanc" acceptable si c'est un choix délibéré pour les pages intérieures légères

### Téléphonie d'entreprise (`/telephonie-entreprise`)
- **Hero** : 🔴 `bg-gradient-to-r from-red-50 to-white` — non conforme
- **Accents** : ⚠️ `text-red-600` (#dc2626) au lieu de `text-red-primary` (#E53E3E)
- **Icônes** : ⚠️ `bg-red-100` pour les icônes (décoration légère — tolérable)
- **Contenu** : Présent mais hero manque d'impact visuel sans photo ni gradient fort

### Contact (`/contact`)
- **Hero** : ✅ Gradient conforme + photo de fond
- **CTA block** : ⚠️ `bg-gradient-to-r from-red-primary to-blue-marine` — gradient inversé par rapport à la charte (charte : bleu→rouge, ici rouge→bleu)
- **Formulaire** : ✅ Fonctionnel (HubSpot embed)
- **Icônes formulaire** : ✅ `bg-red-primary`

### Devis en ligne (`/devis-en-ligne`)
- **Hero** : ✅ Gradient conforme + photo de fond
- **Boutons** : ⚠️ `bg-red-600` au lieu de `bg-red-primary` (couleur légèrement différente)
- **Sections** : `bg-gray-50` répété 3 fois — acceptable comme fond de section secondaire
- **Contenu** : ✅ Formulaire multi-étapes présent

### Qui sommes-nous (`/qui-sommes-nous`)
- **Hero** : ✅ Gradient conforme + photo de fond
- **Sections** : `bg-gray-50` répété — acceptable
- **Élément décoratif** : ⚠️ `bg-gradient-to-br from-blue-50 to-red-50` — nuances trop claires hors charte
- **Contenu** : ✅ Équipe, valeurs, histoire présents

### Téléphonie 3CX (`/telephonie-3cx`)
- **Hero** : ✅ Gradient conforme + photo de fond
- **Cards tarifs** : 🔴 Plusieurs gradients non conformes :
  - `from-gray-800 via-gray-600 to-gray-500` (cards grises)
  - `from-red-primary via-red-500 to-orange-500` 🔴 orange hors charte
- **Sections** : `bg-gradient-to-br from-gray-50 to-white` — tolérable

### 3CX Cloud (`/3cx-cloud`)
- **Hero** : ✅ Gradient conforme + photo de fond
- **Accents texte** : ⚠️ `text-red-400` et `text-red-600` au lieu de `red-primary`
- **Cards tarifs** : 🔴 Gradient `to-orange-500` hors charte (même problème que telephonie-3cx)
- **Contenu** : ✅ Complet

### ~~Mobilité (`/mobilite`)~~ — page supprimée (2026-05-18)
- **Statut** : route retirée du site ; `/mobilite` renvoie 404. L’offre téléphonie mobile E2I (MVNO, Box 4G/5G) n’est plus au catalogue. Le softphone 3CX mobile reste couvert par `/telephonie-3cx`.
- **Note audit** : les constats ci-dessous (hero, accents) ne s’appliquent plus ; conservés ici à titre d’archive de l’audit du 2026-05-16.

### Studio attente téléphonique (`/studio-attente`)
- **Hero** : 🔴 `bg-gradient-to-r from-purple-50 to-white` — violet TOTALEMENT hors charte
- **Sections** : `bg-gray-50` — acceptable
- **Contenu** : Présent

### Assistants vocaux IA (`/nos-services/assistants-vocaux-ia`)
- **Hero** : ⚠️ `bg-gradient-to-br from-gray-50 to-white` — pas de gradient charte, visuellement terne
- **Sections** : Fond gris répété
- **Contenu** : Présent mais manque d'impact visuel

### Tronc SIP compteur (`/telephonie-entreprise/trunk-sip-compteur`)
- **Hero** : Gradient non trouvé → à vérifier
- **Décoratif** : `bg-gradient-to-br from-blue-50 to-red-50` — hors charte mais subtil
- **Contenu** : ✅

### Tronc SIP illimité (`/telephonie-entreprise/trunk-sip-illimite`)
- **Accent line cards** : `bg-gradient-to-r from-red-primary via-red-500 to-blue-marine` ✅ conforme
- **Cards autres** : `from-gray-100 via-gray-50 to-white` — acceptable (décoration neutre)
- **Contenu** : ✅ Complet

### PBX Yeastar (`/telephonie-entreprise/pbx-yeastar`)
- **Hero** : ⚠️ Section hero sans gradient défini (section relative overflow-hidden — fond inconnu)
- **Icône WhatsApp** : ⚠️ `text-green-600` hors charte (acceptable pour icône de service tiers)
- **CTA finale** : ✅ `from-red-primary to-blue-marine`

### Assistance (`/assistance`)
- **Hero** : ⚠️ `from-red-primary to-blue-marine` — gradient inversé (rouge→bleu)
- **Contenu** : Présent

### Politique de confidentialité (`/politique-confidentialite`)
- **Couleurs** : 🔴 Orange, vert, violet présents (green-500, purple-500, orange-500)
- **Note** : Page légale, impact commercial faible mais non conforme

---

## 3. Problèmes de navigation — Liens incohérents

| Lien affiché | URL dans la nav | Page existante | Statut |
|---|---|---|---|
| Studio attente téléphonique | `/nos-services/studio-attente` | `/studio-attente` | 🔴 404 |
| Assistants vocaux IA (header) | `/assistants-vocaux-ia` | `/nos-services/assistants-vocaux-ia` | 🔴 404 |
| Studio attente (footer) | `/nos-services/studio-attente` | `/studio-attente` | 🔴 404 |
| Assistants vocaux IA (services-section) | `/nos-services/assistants-vocaux-ia` | `/nos-services/assistants-vocaux-ia` | ✅ OK |

**Fichiers à corriger :**
- `components/layout/header-simple.tsx` ligne 45, 49
- `components/layout/header.tsx` lignes 65, 69
- `components/layout/footer.tsx` ligne 115

---

## 4. Violations charte — Synthèse priorisée

### 🔴 Critique (à corriger immédiatement)

1. **Liens 404 navigation** : studio-attente et assistants-vocaux-ia pointent vers de mauvaises URLs dans header/footer
2. **Studio attente hero** : `from-purple-50` — violet totalement hors charte
3. **Gradient `to-orange-500`** : Présent dans telephonie-3cx et 3cx-cloud (cards tarifs)

### ⚠️ Important (à corriger prochainement)

4. **`text-red-400` / `text-red-600` / `bg-red-600`** : utilisés à la place de `red-primary` (#E53E3E) sur homepage hero, 3cx-cloud, devis-en-ligne, telephonie-entreprise — 85 occurrences au total
5. **Hero sans gradient** : nos-services et telephonie-entreprise utilisent un hero `from-red-50 to-white` sans force visuelle
6. **Gradient inversé** : contact et assistance utilisent `from-red-primary to-blue-marine` (rouge→bleu) au lieu de bleu→rouge

### ℹ️ Mineur (acceptable ou choix délibéré)

7. `bg-gray-50` comme fond de section secondaire — tolérable, proche de `#FFFFFF`
8. `text-green-600` sur icône WhatsApp — icône de service tiers, justifié
9. `from-blue-50 to-red-50` comme fond décoratif — très subtil, peu visible

---

## 5. Recommandations prioritaires

### Étape 1 — Corriger les 404 (15 min)
```tsx
// header.tsx et header-simple.tsx
href: "/studio-attente"          // était: /nos-services/studio-attente
href: "/nos-services/assistants-vocaux-ia"  // était: /assistants-vocaux-ia

// footer.tsx
href="/studio-attente"           // était: /nos-services/studio-attente
```

### Étape 2 — Corriger le hero studio-attente (5 min)
Remplacer `from-purple-50 to-white` par le gradient standard ou `bg-white`.

### Étape 3 — Supprimer orange-500 des cards tarifs (10 min)
Dans `telephonie-3cx/page.tsx` et `3cx-cloud/page.tsx`, remplacer `to-orange-500` par `to-red-primary`.

### Étape 4 — Homogénéiser red-400/red-600 → red-primary (optionnel / batch)
Rechercher-remplacer `text-red-400`, `text-red-600`, `bg-red-600` par leurs équivalents `red-primary`.

---

## 6. Points positifs à conserver

- ✅ Hero gradient conforme sur toutes les pages avec photo (contact, devis, qui-sommes-nous, telephonie-3cx, 3cx-cloud)
- ✅ Utilisation de `red-primary` et `blue-marine` correcte sur la majorité des pages
- ✅ Navigation principale structurée et cohérente (hormis les 3 URLs erronées)
- ✅ Sections CTA finales harmonisées
- ✅ Carousel clients ✅, témoignages ✅ présents sur la homepage
- ✅ Titre de page (title tag) bien renseigné sur toutes les pages vérifiées
