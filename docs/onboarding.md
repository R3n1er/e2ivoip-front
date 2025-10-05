# Onboarding Développeurs – E2I VoIP Front

Bienvenue ! Ce document synthétise l’essentiel pour être opérationnel rapidement sur le projet `e2ivoip-front`.

## 1. Vision d’ensemble
- **Objectif produit :** site marketing Next.js pour promouvoir les offres téléphonie IP d’E2I (Trunk SIP, 3CX, mobilité, assistants IA, etc.).
- **Stack principale :** Next.js 15 (App Router) + TypeScript + TailwindCSS/DaisyUI + composants shadcn-ui.
- **Modes de rendu :** pages statiques hybridées avec composants interactifs côté client, service worker pour support offline/PWA light.
- **Références internes :**
  - `docs/PRD.md` : Product Requirement Document.
  - `docs/ligne-editoriale.md` : ton éditorial.
  - `agents.md` : check-list de livraison à respecter.

## 2. Pré-requis & installation
1. Node.js 22.12.0 (via `.nvmrc`).
2. Cloner le dépôt puis installer les dépendances : `npm install`. Pour les scripts internes : `npm run install:all` (installe les dépendances dans `scripts/`).
3. Copier `.env.example` → `.env.local` et compléter les clés (Contentful, HubSpot, URLR…).
4. Démarrer le serveur local : `npm run dev` (port 3000). Le service worker charge `/sw.js` automatiquement en local.

## 3. Structure du projet
```text
e2ivoip-front/
├── app/                 # Routes App Router (pages marketing + API routes)
│   ├── layout.tsx       # Layout global (fonts, header/footer, trackers)
│   ├── page.tsx         # Homepage
│   ├── [section]/       # Pages thématiques (blog, assistance, mobilite, etc.)
│   └── api/             # Routes API (Contentful/HubsPot utilitaires)
├── components/          # Sections marketing et intégrations HubSpot/Tawk
│   └── ui/              # Design system shadcn (Button, Card, etc.)
├── hooks/               # Hooks React maison (ex : service worker)
├── lib/                 # Services (Contentful, HubSpot, URLR, utils…)
├── public/              # Assets statiques + Service Worker `sw.js`
├── scripts/             # Scripts Node de pipeline éditorial (blog, images)
├── tests/               # Suites Jest/Testing Library + Playwright
├── tailwind.config.js   # Config Tailwind + DaisyUI
├── next.config.ts       # Config Next (images…)
└── agents.md            # Procédure de livraison
```

## 4. Layout & navigation
- `app/layout.tsx` applique les polices Geist, configure `HubSpotTracking`, `HotjarTracking`, `TawkTo`, et installe `HeaderSimple` + `Footer` sur tout le site.
- `components/header-simple.tsx` fournit la navigation principale : menu desktop avec sous-menus CSS (offres téléphonie, services, blog) et drawer mobile. CTA contact via `CTAButton`.
- `components/footer.tsx` rassemble branding, liens utilitaires, coordonnées (vérifier la cohérence des numéros région DOM/France).

## 5. Pages clés
### 5.1 Homepage (`app/page.tsx`)
Orchestre les sections marketing : hero, transformation, carousel clients, about, services, contact. Animations Tailwind (blobs) et CTA TawkTo.

### 5.2 Blog (`app/blog/...`)
- `app/blog/page.tsx` (client) gère état, recherche (Contentful), paginition. Filtre `query` déjà implémenté, facettes auteur/années/tags à étendre côté API.
- `components/blog/` contient `BlogSearch`, `BlogPostsGrid`, pagination, `optimized-blog-image.tsx`.
- `app/api/blog/list/route.ts` et `lib/contentful-blog.ts` communiquent avec Contentful (Content Delivery API). Prévoir variables `CONTENTFUL_*`.
- `app/api/blog/[slug]/route.ts` expose un fetch unitaire (slug).

### 5.3 Pages services/produits
Dossiers `app/telephonie-3cx`, `app/nos-services/...`, `app/assistance`, `app/mobilite`, etc. Chaque page présente un hero, sections CTA, FAQ (`components/faq-working`) et intégrations (formulaires HubSpot, iframes TawkTo).

### 5.4 Contact (`app/contact/page.tsx`)
Hero illustré + carte HubSpot inline, hotline/WhatsApp, implantations DOM. Vérifier correspondance des pictos et data-tests (`data-testid`) utilisés en tests.

### 5.5 Offline (`app/offline/page.tsx`)
Page fallback PWA, propose actions Appeler/Email. Vérifier cohérence des numéros (actuellement placeholders).

## 6. Intégrations externes
| Intégration | Fichiers | Notes |
|-------------|----------|-------|
| **HubSpot** | `components/hubspot-*`, `app/api/hubspot/*`, `lib/hubspot-blog.ts` | Tracking, formulaires, OAuth blog. Nécessite `HUBSPOT_*` dans `.env.local`.
| **Contentful** | `lib/contentful-blog.ts`, `scripts/extract-blog-content.js` | Blog marketing. Tokens Delivery/Preview.
| **Tawk.to** | `components/tawk-to.tsx`, `components/tawk-to-chat.tsx` | Support chat. Garder IDs à jour.
| **URLR** | `lib/urlr.ts` | Raccourcis d’articles. Auth utilisateur/password + team.
| **Hotjar & Tally** | `components/hotjar-tracking.tsx`, script Tally dans `app/layout.tsx` | Analytics, formulaires externes.

## 7. Service worker & PWA
- Fichier `public/sw.js` : cache-first images, network-first API/pages, fallback offline. Prévoit message `SKIP_WAITING`, `GET_CACHE_STATUS`, cleanup périodique.
- Hook `hooks/use-service-worker.ts` gère enregistrement, updates, cleanup caches, rechargement.
- Vérifier qu’un fallback image existe (`/images/placeholder.jpg` à créer ou adapter).

## 8. Scripts utilitaires (`scripts/`)
- Extraction blog (`extract-blog-content.js`, `test-extraction.js`).
- Vérifications PRD (`verify-prd-colors.js`).
- Génération assets IA (`generate-ai-covers-openai.js`).
- Import vers Contentful/HubSpot.
Exécuter via `node scripts/<script>` ou `npm run extract:blog`.

## 9. Testing & QA
- **Unitaires/Jest** : `npm test` lance `jest` (configs `jest.config.js`). Tests dans `tests/` (composants, pages, intégrations). Certains tests restent placeholders → à renforcer.
- **Playwright** : `npm run test:e2e`. Suites dans `tests/e2e` ou `tests/playwright/`.
- **Hydratation CSS** : lancer `npm run dev` et surveiller la console (warnings hydration, collisions Tailwind).
- Pipeline de livraison : suivre `agents.md` (tests unitaires → Playwright → restart serveur → commit/push).

## 10. Conventions de code
- **Langue** : contenu marketing en français ; code/commentaires en anglais lorsque nécessaire.
- **CSS** : Tailwind + DaisyUI ; helper `cn()` (lib/utils) pour fusion de classes. Utiliser les tokens de couleurs PRD (voir `tailwind.config.js` + `verify-prd-colors.js`).
- **Composants** : préférer composants modulaires dans `components/`. Les UI primitives vont dans `components/ui/` (pattern shadcn). Garder props typées `Props`/`React.FC`.
- **Tests** : à chaque fonctionnalité, ajouter test(s) Jest + Playwright selon Agents Memo.
- **Env vars** : centraliser modifications dans `.env.example` et documenter dans ce fichier.

## 11. Workflows communs
- **Créer une nouvelle page marketing** :
  1. `app/<slug>/page.tsx` (server ou client component selon besoin).
  2. Ajouter les sections nécessaires dans `components/`.
  3. Mettre à jour navigation (`components/header-simple.tsx`) + sitemap (`app/sitemap.ts`).
  4. Ajouter tests Jest (render minimal) + Playwright (affichage).

- **Ajouter un article blog depuis Contentful** :
  1. Créer l’entrée Contentful (type `blogPost`).
  2. Vérifier via `/api/blog/list` ou lancer `scripts/extract-blog-content.js` pour debug.
  3. Ajouter tests de rendu blog si patterns nouveaux.

- **Modifier une intégration HubSpot** :
  1. Mettre à jour `components/hubspot-*` ou route API.
  2. Tester en local avec clés OAuth (penser à `HUBSPOT_REDIRECT_URI`).
  3. Ajouter tests Playwright si formulaire ou CTA modifié.

## 12. Suivi & documentation
- Noter les décisions structurantes dans `docs/` (PRD, ligne éditoriale, ce document).
- Pour toute règle pérenne, mettre à jour `agents.md` (procédure) ou ce document (onboarding).
- Utiliser issues/PR GitHub avec checklist tests (`npm test`, `npx playwright test`, restart `npm run dev`).

## 13. Ressources complémentaires
- [Next.js App Router Docs](https://nextjs.org/docs/app) – référence framework.
- [TailwindCSS](https://tailwindcss.com/docs) & [DaisyUI](https://daisyui.com/) – design system.
- [Contentful CDA](https://www.contentful.com/developers/docs/references/content-delivery-api/) – API blog.
- [HubSpot CMS API](https://developers.hubspot.com/docs/api/cms/blog) – intégration articles.
- [Playwright](https://playwright.dev/docs/test-intro) – tests E2E affichage.

Bienvenue encore ! Une fois prêt, prenez une tâche, suivez le mémo `agents.md` et gardez ce guide ouvert pour naviguer dans le codebase.
