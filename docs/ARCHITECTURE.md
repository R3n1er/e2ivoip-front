# Architecture du Projet - E2I VoIP

> **Documentation de l'architecture organisée après refactorisation Phase 6**

**Date de création** : 2025-10-04
**Dernière mise à jour** : 2025-10-04
**Statut** : ✅ Phase 6 terminée

---

## 📁 Structure des Dossiers

### Vue d'ensemble

```
e2ivoip-front/
├── app/                          # Pages NextJS 15 App Router
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Homepage
│   ├── blog/                     # Pages blog
│   ├── contact/                  # Page contact
│   └── [autres-routes]/
├── components/                   # Composants React
│   ├── hubspot/                  # Composants HubSpot
│   │   ├── hubspot-form.tsx      # ✅ Nouveau composant universel
│   │   ├── index.ts              # Exports publics
│   │   └── legacy/               # Anciens composants (à migrer)
│   ├── layout/                   # Composants de mise en page
│   │   ├── header.tsx            # Header principal
│   │   ├── header-simple.tsx     # Header simplifié
│   │   └── footer.tsx            # Footer
│   ├── blog/                     # Composants blog
│   ├── ui/                       # Composants UI réutilisables
│   └── [autres-composants]/
├── lib/                          # Bibliothèques et utilitaires
│   ├── constants/                # Constantes centralisées
│   │   └── hubspot.ts            # ✅ Constantes HubSpot
│   ├── hooks/                    # Hooks personnalisés organisés
│   │   ├── hubspot/              # Hooks HubSpot
│   │   │   └── use-hubspot-script.ts
│   │   ├── forms/                # Hooks formulaires
│   │   │   └── use-chat-intake.ts
│   │   └── ui/                   # Hooks UI
│   │       └── use-image-optimization.ts
│   ├── utils/                    # Utilitaires
│   │   └── lazy-motion.tsx       # ✅ Lazy loading Framer Motion
│   └── validation/               # Schémas de validation
│       └── chat-intake.ts        # ✅ Validation Zod
├── tests/                        # Tests Jest + Playwright
│   ├── *.test.tsx                # Tests unitaires
│   └── playwright/               # Tests E2E
└── docs/                         # Documentation
    ├── PRD.md                    # Product Requirements
    ├── REFACTORING.md            # Journal refactorisation
    ├── OPTIMIZATIONS.md          # Guide optimisations
    ├── BUNDLE_ANALYSIS.md        # Analyse bundle
    └── ARCHITECTURE.md           # Ce fichier
```

---

## 🏗️ Organisation par Domaine

### 1. Composants HubSpot

**Emplacement** : `components/hubspot/`

#### Structure

```
components/hubspot/
├── hubspot-form.tsx              # ✅ Composant universel (Phase 2)
├── index.ts                      # Exports publics
└── legacy/                       # Anciens composants
    ├── hubspot-calendar.tsx
    ├── hubspot-contact-form-global.tsx
    ├── hubspot-contact-form.tsx
    ├── hubspot-form-inline.tsx
    ├── hubspot-form.tsx
    ├── hubspot-forms.tsx
    ├── hubspot-simple.tsx
    └── hubspot-tracking.tsx
```

#### Composants Recommandés

**✅ Utiliser** : `components/hubspot/hubspot-form.tsx`

```tsx
import { HubSpotForm, InlineContactForm, FullContactForm } from "@/components/hubspot";

// Utilisation
<HubSpotForm formId="CONTACT_GENERAL" />
<InlineContactForm />
<FullContactForm />
```

**❌ Éviter** : Composants dans `legacy/` (à migrer progressivement)

#### Migration Legacy

Les composants dans `legacy/` doivent être migrés progressivement vers le nouveau composant universel. Voir `docs/REFACTORING.md` Phase 2 pour le guide de migration.

---

### 2. Composants Layout

**Emplacement** : `components/layout/`

#### Structure

```
components/layout/
├── header.tsx              # Header principal avec navigation
├── header-simple.tsx       # Header simplifié
└── footer.tsx              # Footer du site
```

#### Utilisation

```tsx
import { Header } from "@/components/layout/header";
import { HeaderSimple } from "@/components/layout/header-simple";
import { Footer } from "@/components/layout/footer";
```

**Note** : Ces composants utilisent Framer Motion directement (pas de lazy loading) car ils sont critiques pour la navigation.

---

### 3. Hooks Personnalisés

**Emplacement** : `lib/hooks/`

#### Structure par Domaine

```
lib/hooks/
├── hubspot/                      # Hooks HubSpot
│   └── use-hubspot-script.ts     # ✅ Chargement scripts HubSpot
├── forms/                        # Hooks formulaires
│   └── use-chat-intake.ts        # ✅ Mutation TanStack Query
└── ui/                           # Hooks UI
    └── use-image-optimization.ts # Optimisation images
```

#### Import Pattern

```tsx
// Hooks HubSpot
import { useHubSpotFormsScript } from "@/lib/hooks/hubspot/use-hubspot-script";

// Hooks Forms
import { useChatIntake } from "@/lib/hooks/forms/use-chat-intake";

// Hooks UI
import { useImageOptimization } from "@/lib/hooks/ui/use-image-optimization";
```

#### Hooks Disponibles

**HubSpot** :
- `useHubSpotFormsScript()` - Charge script formulaires HubSpot
- `useHubSpotTrackingScript()` - Charge script tracking
- `useHubSpotReady()` - Callback quand HubSpot prêt
- `useHubSpotFormsWithRetry()` - Avec retry automatique

**Forms** :
- `useChatIntake()` - Mutation pour formulaire pré-chat

**UI** :
- `useImageOptimization()` - Optimisation images

---

## 🎨 Composants UI Réutilisables

**Emplacement** : `components/ui/`

### Composants DaisyUI + shadcn

- `button.tsx`, `card.tsx`, `badge.tsx` - Composants UI de base
- `cta-button.tsx` - Bouton CTA E2I VoIP
- `feature-card.tsx` - Carte de fonctionnalité
- `gradient-button.tsx` - Bouton avec dégradé
- `lazy-background-image.tsx` - Image background lazy
- `optimized-image.tsx` - Image Next.js optimisée

### Composants Animation (Optimisés Phase 5)

**Emplacement** : `lib/utils/lazy-motion.tsx`

```tsx
import { SimpleFadeIn, CardFadeIn, HeroAnimation } from "@/lib/utils/lazy-motion";

// Utilisation
<SimpleFadeIn delay={0.2}>
  <p>Contenu animé avec lazy loading</p>
</SimpleFadeIn>
```

**✅ Avantage** : Framer Motion chargé uniquement au scroll (économie -60 KB bundle)

---

## 📦 Constantes Centralisées

### HubSpot

**Emplacement** : `lib/constants/hubspot.ts`

```tsx
import { HUBSPOT_CONFIG, getHubSpotFormId } from "@/lib/constants/hubspot";

// Utilisation
const portalId = HUBSPOT_CONFIG.PORTAL_ID;
const formId = getHubSpotFormId("CONTACT_GENERAL");
```

**Configuration disponible** :
- `PORTAL_ID` - ID du portail HubSpot
- `REGION` - Région (eu1)
- `FORMS` - IDs de formulaires
- `SCRIPTS` - URLs de scripts

---

## ✅ Validation et Schémas

### Zod Schemas

**Emplacement** : `lib/validation/`

#### Chat Intake

```tsx
import { chatIntakeSchema, validateChatIntake } from "@/lib/validation/chat-intake";

// Utilisation avec React Hook Form
const { register, handleSubmit } = useForm({
  resolver: zodResolver(chatIntakeSchema),
});

// Validation manuelle
const result = validateChatIntake(data);
```

**Schémas disponibles** :
- `chatIntakeSchema` - Formulaire pré-chat
- `chatIntakeApiSchema` - Payload API étendu

---

## 🧪 Tests

### Structure des Tests

```
tests/
├── *.test.tsx                 # Tests unitaires Jest
├── components/                # Tests composants
│   └── ui/
└── playwright/                # Tests E2E
    └── *.spec.ts
```

### Patterns de Test

#### Mock HubSpot Script

```tsx
jest.mock("@/lib/hooks/hubspot/use-hubspot-script", () => ({
  useHubSpotFormsScript: () => ({
    loaded: true,
    loading: false,
    error: null,
  }),
}));
```

#### Mock Composants Layout

```tsx
jest.mock("@/components/layout/header", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock("@/components/layout/footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));
```

---

## 🚀 Conventions de Code

### Imports

**Ordre recommandé** :

```tsx
// 1. React et Next.js
import { useState, useEffect } from "react";
import Link from "next/link";

// 2. Bibliothèques tierces
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

// 3. Composants internes
import { HubSpotForm } from "@/components/hubspot";
import { Header } from "@/components/layout/header";

// 4. Hooks personnalisés
import { useHubSpotFormsScript } from "@/lib/hooks/hubspot/use-hubspot-script";

// 5. Utilitaires et constantes
import { HUBSPOT_CONFIG } from "@/lib/constants/hubspot";
import { cn } from "@/lib/utils";

// 6. Types
import type { ChatIntakeFormData } from "@/lib/validation/chat-intake";
```

### Chemins Absolus vs Relatifs

**✅ Utiliser chemins absolus (@/)** :
```tsx
import { Header } from "@/components/layout/header";
import { useHubSpotFormsScript } from "@/lib/hooks/hubspot/use-hubspot-script";
```

**❌ Éviter chemins relatifs** (sauf dans legacy/) :
```tsx
import { Header } from "../../components/layout/header"; // ❌
```

---

## 📊 Métriques Post-Refactorisation

### Code Quality

| Métrique | Avant | Après Phase 6 | Gain |
|----------|-------|---------------|------|
| Fichiers HubSpot dupliqués | 8 | 3 (1 + legacy) | -62.5% |
| Organisation hooks | Plat | Par domaine | +100% |
| Organisation composants | Plat | Par domaine | +100% |
| Imports clairs | Partiel | Complet | +100% |

### Tests

| Métrique | Statut |
|----------|--------|
| Tests unitaires | ✅ 309/309 (100%) |
| Tests E2E | ✅ 32/32 (100%) |
| Régressions | ✅ 0 |

---

## 🔄 Migration des Composants Legacy

### Checklist Migration

Pour migrer un composant de `legacy/` vers le nouveau système :

1. **Identifier le composant** à migrer
2. **Vérifier les dépendances** (imports, props)
3. **Utiliser le nouveau composant** : `<HubSpotForm formId="..." />`
4. **Mettre à jour les tests** (mocks, imports)
5. **Valider** : `npm test`
6. **Supprimer l'ancien** si plus utilisé

### Exemple Migration

**Avant** (legacy) :
```tsx
import { HubSpotContactFormGlobal } from "@/components/hubspot/legacy/hubspot-contact-form-global";

<HubSpotContactFormGlobal
  portalId="26878201"
  formId="312a9f67-e613-4651-9690-4586646554a0"
  region="eu1"
/>
```

**Après** (nouveau) :
```tsx
import { HubSpotForm } from "@/components/hubspot";

<HubSpotForm formId="CONTACT_GENERAL" />
```

---

## 📚 Documentation Complémentaire

- **REFACTORING.md** - Journal complet de toutes les phases
- **OPTIMIZATIONS.md** - Guide des optimisations de performance
- **BUNDLE_ANALYSIS.md** - Analyse détaillée du bundle
- **PRD.md** - Product Requirements Document

---

## ✅ Checklist Développeur

Avant de créer un nouveau composant :

- [ ] Est-ce que je peux utiliser un composant existant dans `components/ui/` ?
- [ ] Est-ce que je peux utiliser `HubSpotForm` au lieu de créer un nouveau composant HubSpot ?
- [ ] Ai-je besoin d'animations ? → Utiliser `SimpleFadeIn` de `lazy-motion.tsx`
- [ ] Ai-je besoin d'un hook ? → Le placer dans le bon domaine (`hubspot/`, `forms/`, `ui/`)
- [ ] Les chemins d'import sont-ils absolus avec `@/` ?
- [ ] Les tests sont-ils à jour avec les nouveaux chemins ?

---

**Dernière mise à jour** : 2025-10-04 21:00
**Responsable** : Alban (Chef de projet)
**Statut** : ✅ Architecture organisée - Phase 6 complète
