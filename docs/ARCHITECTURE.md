# Architecture du Projet - E2I VoIP

> Référence technique du projet. Source de vérité pour la structure, les conventions et le workflow.

**Dernière mise à jour** : 2026-05-16

---

## 📁 Structure des Dossiers

```
e2ivoip-front/
├── app/                          # Pages NextJS 15 App Router
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Homepage
│   ├── blog/                     # Pages blog (Contentful)
│   ├── contact/                  # Page contact
│   └── [autres-routes]/
├── components/
│   ├── hubspot/                  # Composants HubSpot
│   │   ├── hubspot-form.tsx      # Composant universel
│   │   ├── index.ts              # Exports publics
│   │   └── legacy/               # Anciens composants (migration progressive)
│   ├── layout/                   # Header / Footer
│   ├── ui/                       # Composants DaisyUI customisés
│   └── features/                 # Composants métier
├── lib/
│   ├── constants/hubspot.ts      # Constantes HubSpot centralisées
│   ├── hooks/                    # Hooks organisés par domaine
│   │   ├── hubspot/              # use-hubspot-script, etc.
│   │   ├── forms/                # use-chat-intake, etc.
│   │   └── ui/                   # use-image-optimization, etc.
│   ├── utils/lazy-motion.tsx     # Lazy loading Framer Motion (-60KB bundle)
│   └── validation/               # Schémas Zod
├── tests/                        # Jest (unitaires) + Playwright (E2E)
├── docs/                         # Documentation
└── .planning/                    # Roadmap GSD (source de vérité planification)
```

---

## 🏗️ Composants Clés

### HubSpot

```tsx
import { HubSpotForm, InlineContactForm, FullContactForm } from "@/components/hubspot";

<HubSpotForm formId="CONTACT_GENERAL" />
```

Les composants dans `legacy/` sont à migrer progressivement vers `HubSpotForm`.

### Layout

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
```

Ces composants utilisent Framer Motion directement (critiques pour la navigation, pas de lazy load).

### Animations (Lazy Motion)

```tsx
import { SimpleFadeIn, CardFadeIn, HeroAnimation } from "@/lib/utils/lazy-motion";

<SimpleFadeIn delay={0.2}>
  <p>Contenu animé — Framer Motion chargé uniquement au scroll</p>
</SimpleFadeIn>
```

**Règle** : toujours passer par `lazy-motion.tsx` pour les animations non critiques. Gain : -60KB sur le bundle initial.

### Hooks

```tsx
import { useHubSpotFormsScript } from "@/lib/hooks/hubspot/use-hubspot-script";
import { useChatIntake } from "@/lib/hooks/forms/use-chat-intake";
```

---

## 📦 Constantes HubSpot

```tsx
import { HUBSPOT_CONFIG, getHubSpotFormId } from "@/lib/constants/hubspot";

const portalId = HUBSPOT_CONFIG.PORTAL_ID; // 26878201
const formId = getHubSpotFormId("CONTACT_GENERAL");
```

---

## 🚀 Performance

| Optimisation | Gain | Pattern |
|---|---|---|
| Lazy Framer Motion | -60KB bundle initial | `SimpleFadeIn` depuis `lazy-motion.tsx` |
| React.memo | -40% re-renders composants lourds | `export const X = memo(function X(...) {...})` |
| useCallback | -20% re-renders | Mémoriser les callbacks passés en props |
| Dynamic imports | -25% initial load | `dynamic(() => import(...), { ssr: false })` |
| next/image | LCP optimisé | Toujours utiliser plutôt que `<img>` |

### Bundle Analyzer

```bash
npm run analyze
# Ouvre .next/analyze/client.html et server.html
```

---

## 🎨 Conventions d'import

```tsx
// 1. React / Next.js
import { useState } from "react";
import Link from "next/link";

// 2. Bibliothèques tierces
import { useForm } from "react-hook-form";

// 3. Composants internes (@/ absolu — jamais de chemin relatif)
import { HubSpotForm } from "@/components/hubspot";
import { Header } from "@/components/layout/header";

// 4. Hooks
import { useHubSpotFormsScript } from "@/lib/hooks/hubspot/use-hubspot-script";

// 5. Utilitaires / constantes
import { HUBSPOT_CONFIG } from "@/lib/constants/hubspot";

// 6. Types
import type { ChatIntakeFormData } from "@/lib/validation/chat-intake";
```

---

## 🧪 Tests

### Patterns Mocks

```tsx
// Mock HubSpot script
jest.mock("@/lib/hooks/hubspot/use-hubspot-script", () => ({
  useHubSpotFormsScript: () => ({ loaded: true, loading: false, error: null }),
}));

// Mock layout
jest.mock("@/components/layout/header", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));
jest.mock("@/components/layout/footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));
```

---

## 🔐 Workflow Validation Pre-Push (OBLIGATOIRE)

```bash
npm run validate
# = lint + type-check + test:ci + test:e2e + audit + build
```

Le push est **bloqué** si l'un de ces 6 contrôles échoue :

| Contrôle | Commande | Critère |
|---|---|---|
| Tests Jest | `npm run test:ci` | 100% passent |
| Tests Playwright | `npm run test:e2e` | 100% passent |
| ESLint | `npm run lint` | 0 erreur |
| TypeScript | `npm run type-check` | 0 erreur |
| Sécurité | `npm audit --audit-level=high` | 0 HIGH/CRITICAL |
| Build prod | `npm run build` | Succès |

---

## ✅ Checklist Développeur (nouveau composant)

- [ ] Composant existant dans `components/ui/` réutilisable ?
- [ ] `HubSpotForm` suffisant plutôt qu'un nouveau composant HubSpot ?
- [ ] Animations → `SimpleFadeIn` / `lazy-motion.tsx` ?
- [ ] Hook → placé dans le bon domaine (`hubspot/`, `forms/`, `ui/`) ?
- [ ] Imports absolus avec `@/` ?
- [ ] Tests Jest + Playwright écrits ?

---

## 📚 Documentation Complémentaire

- `docs/PRD.md` — Product Requirements
- `docs/ADR.md` — Décisions d'architecture
- `docs/CHARTE_GRAPHIQUE.md` — Couleurs et UI (source de vérité)
- `docs/BrandBrief_e2ivoip.md` — Positionnement et ton
- `.planning/ROADMAP.md` — Roadmap GSD (planification)
- `memory.md` — Suivi projet et décisions structurantes
