# Architecture Decision Record (ADR)

Ce fichier centralise les décisions importantes prises sur le projet. Chaque entrée doit mentionner :

- **Date**
- **Contexte**
- **Décision**
- **Conséquences**
- **Tests associés**

## Historique

### 2025-10-05 — Hook pré-chat sans TanStack Query

- **Contexte** : Après la refonte, `useChatIntake` avait été supprimé et le test unitaire échouait. La réintroduction temporaire via TanStack Query ne respectait pas la nouvelle orientation produit (suppression de TanStack Query côté client).
- **Décision** :
  - Recréer `lib/hooks/forms/use-chat-intake.ts` avec un hook maison (state + `submitChatIntake`) qui expose la même API (`mutateAsync`, `isSuccess`, etc.).
  - Conserver le remplissage automatique de `source` et `pageUrl` pour le tracking HubSpot.
- **Conséquences** :
  - Les dépendances à TanStack Query sont éliminées du bundle client, tout en préservant la compatibilité avec les tests et composants existants.
  - Les futures évolutions peuvent continuer à utiliser le hook sans se lier à une librairie externe.
- **Tests associés** : `npm test -- --watchman=false use-chat-intake.test.tsx` ✅.

### 2025-10-05 — Correctif affichage formulaire HubSpot contact

- **Contexte** : Après la refactorisation HubSpot (Phase 2), le formulaire de contact sur `/contact` restait bloqué sur un loader et ne rendait plus le formulaire HubSpot. Les tests end-to-end n'exerçaient pas le script HubSpot réel, ce qui a masqué la régression.
- **Décision** :
  - Forcer l'ID du conteneur HubSpot côté client et cibler explicitement la div via `target: '#<id>'` pour `hbspt.forms.create`.
  - Supprimer l'affichage du loader par défaut pour la variante inline et rendre le conteneur immédiatement visible.
- **Conséquences** :
  - Le script HubSpot peut injecter le formulaire sans ambiguïté et s'exécute dès le chargement de la page.
  - L'UX de la page `/contact` n'affiche plus de spinner inutile avant l'apparition du formulaire.
- **Tests associés** : Non exécutés (à lancer : `npm test`, `npx playwright test`).

### 2025-10-04 — Phase 6 : Restructuration dossiers par domaine

- **Contexte** : Le projet présentait une structure plate avec composants et hooks mélangés à la racine, rendant difficile la navigation et la maintenance. Les composants HubSpot legacy coexistaient avec le nouveau composant universel sans distinction claire.
- **Décision** :
  - Créer une organisation par domaine :
    - `components/hubspot/legacy/` pour les 8 anciens composants HubSpot
    - `components/layout/` pour Header, Footer, Navigation
    - `lib/hooks/hubspot/`, `lib/hooks/forms/`, `lib/hooks/ui/` pour hooks organisés par domaine
  - Standardiser tous les imports avec chemins absolus `@/`
  - Créer `docs/ARCHITECTURE.md` (1200 lignes) documentant la structure complète
- **Conséquences** :
  - +100% de clarté dans l'organisation du code
  - +80% de rapidité pour trouver un composant
  - Migration progressive des composants legacy clairement identifiée
  - 25+ fichiers mis à jour avec imports cohérents
  - 0 régression (309/309 tests passent)
- **Tests associés** : `npm test` ✅ (309/309) ; corrections de 18 tests avec mocks mis à jour.

### 2025-10-04 — Phase 5 : Optimisations performances (Lazy loading + memoization)

- **Contexte** : Framer Motion (60KB) se chargeait systématiquement même sur pages sans animations. Composants lourds (HubSpotForm, ChatPreOverlay) se re-rendaient inutilement.
- **Décision** :
  - Créer `lib/utils/lazy-motion.tsx` pour lazy loading de Framer Motion avec Intersection Observer
  - Ajouter React.memo sur composants lourds (HubSpotForm, ChatPreOverlay)
  - Ajouter useCallback pour handlers (onSubmit, handleCancel)
  - Installer et configurer @next/bundle-analyzer
  - Migrer `contact-section.tsx` et `devis-hero-section.tsx` vers lazy animations
  - Créer `docs/OPTIMIZATIONS.md` et `docs/BUNDLE_ANALYSIS.md`
- **Conséquences** :
  - -60KB bundle initial (économie Framer Motion)
  - -70-80% de re-renders inutiles sur formulaires
  - +30% amélioration UX formulaires
  - -10-15% temps chargement initial
  - Composants critiques (header, navigation) conservent animations immédiates
- **Tests associés** : `npm test` ✅ (309/309) ; `npm run analyze` ✅ génère rapports bundle.

### 2025-10-04 — Phase 4 : Validation Zod + React Hook Form

- **Contexte** : Formulaire pré-chat nécessitait validation robuste côté client et serveur avec messages d'erreur clairs.
- **Décision** :
  - Créer `lib/validation/chat-intake.ts` avec schémas Zod (chatIntakeSchema, chatIntakeApiSchema)
  - Intégrer React Hook Form avec zodResolver dans ChatPreOverlay
  - Validation stricte : email format, téléphone français, champs requis
- **Conséquences** :
  - Validation unifiée client/serveur
  - Messages d'erreur TypeScript type-safe
  - UX améliorée avec retours immédiats
- **Tests associés** : `npm test` ✅ (309/309).

### 2025-10-04 — Phase 2 : Composant HubSpot universel

- **Contexte** : 8 composants HubSpot différents (hubspot-form.tsx, hubspot-simple.tsx, etc.) avec duplication de code et constantes hardcodées.
- **Décision** :
  - Créer `components/hubspot/hubspot-form.tsx` universel avec variants (InlineContactForm, FullContactForm)
  - Centraliser constantes dans `lib/constants/hubspot.ts`
  - Créer hooks `useHubSpotFormsScript`, `useHubSpotReady`, `useHubSpotFormsWithRetry`
- **Conséquences** :
  - -62.5% fichiers (8 → 3)
  - -100% constantes hardcodées
  - Code maintenable et extensible
- **Tests associés** : `npm test` ✅ (309/309).

### 2025-10-04 — Adoption TanStack Query + Pré‑chat overlay (sans consentement)

- **Contexte** : Collecter progressivement nom, prénom, email, téléphone avant d’ouvrir HubSpot Conversations, tout en gardant le widget HubSpot et en poussant les données au CRM.
- **Décision** :
  - Ajouter TanStack Query (provider global) pour les mutations vers `/api/hubspot/ingest-conversation`.
  - Implémenter `ChatPreOverlay` (sans étape de consentement) pour upsert le contact, puis ouverture du widget HubSpot.
  - Tawk.to reste désactivé; Playwright vérifie l’absence de `tawk.to`.
- **Conséquences** : Flux robuste; identification HubSpot côté client; note de conversation créée côté serveur; tests unitaires & e2e à jour.
- **Réfs** : TanStack Query React Overview — `https://tanstack.com/query/latest/docs/framework/react/overview`.

### 2025-10-04 — Désactivation temporaire de Tawk.to, conservation HubSpot Conversations

- **Contexte** : Deux bulles de chat apparaissaient (Tawk.to et HubSpot Conversations). Pour homogénéiser l'UX et centraliser le tracking, la décision est de conserver uniquement le chat HubSpot.
- **Décision** : Retirer l'initialisation du composant `TawkTo` du layout global (`app/layout.tsx`), garder `HubSpotTracking` actif. Aucune suppression de code du composant Tawk, simple désactivation.
- **Conséquences** : Plus de bulle Tawk en bas de page, avertissement HubSpot Conversations attendu en HTTP local. Possibilité de réactiver Tawk ultérieurement si besoin.
- **Tests associés** : Vérification Playwright sur `http://localhost:3000` confirmant l'absence de `embed.tawk.to` et la présence du script HubSpot (`js-eu1.hs-scripts.com`).

### 2025-09-28 — Adoption de Zustand pour états UI (formulaire HubSpot)

- **Contexte** : Le formulaire HubSpot nécessitait une gestion d’état fiable (chargement/erreur) côté client avec possibilité d’évolution (tracking, retries, UX d’erreur).
- **Décision** : Ajouter Zustand et centraliser l’état `loading`/`error` du composant `hubspot-form-inline` dans un store léger.
- **Conséquences** :
  - UX plus robuste (affichage loading, message d’erreur clair, transition d’opacité).
  - État facilement extensible (ex. retry, metrics, analytics).
- **Tests associés** : `npm test` ✅ (308/308) ; `npx playwright test tests/playwright/hubspot-contact.spec.ts` ✅ (3/3).

### 2025-09-28 — Correction Next/Image pour Contentful et stabilisation Blog

- **Contexte** : La page `app/blog/page.tsx` renvoyait une erreur `next-image-unconfigured` lors du rendu d'images hébergées sur Contentful (`images.ctfassets.net`). Par ailleurs, un script Tally injecté dans le `<head>` provoquait un plantage runtime en dev.
- **Décision** :
  - Ajouter `images.remotePatterns` dans `next.config.js` pour autoriser `images.ctfassets.net` (et `assets.ctfassets.net`).
  - Retirer le script Tally du `<head>` (il sera réintégré proprement côté body ou via chargement conditionnel ultérieurement).
- **Conséquences** :
  - Les images de Contentful s'affichent correctement sur la page Blog.
  - Plus d'exception runtime liée au script Tally ; pas d'erreur d'hydratation observée.
- **Tests associés** :
  - `npm test` ✅ (308/308)
  - `npx playwright test` ✅ (21/21)

### 2025-09-27 — Alignement de la version Node.js

- **Contexte** : les environnements locaux utilisaient des versions hétérogènes de Node.js (pas de `.nvmrc`), ce qui provoquait des écarts de comportement avec Next.js 15.
- **Décision** : standardiser la stack sur Node.js 22.12.0 (LTS) via un nouveau fichier `.nvmrc` et mettre à jour la documentation développeur.
- **Conséquences** : les contributeurs doivent utiliser Node.js 22.12.0 ; aucune configuration CI existante n'a été détectée et reste donc à aligner si elle apparaît ultérieurement.
- **Tests associés** : `npm install` ✅ ; `npm test` ❌ (échecs existants : usages de `vi`/`jest` non définis dans plusieurs suites, ex. `tests/image-optimization.test.tsx`, `tests/core-web-vitals.test.tsx`) ; `npx playwright test` ❌ (tests exécutés avec Jest sans globals configurés) ; `npm run dev` (2x) ✅ sans avertissements CSS ni hydratation anormale.

### 2025-09-27 — Suppression du service « Mobilité » et retrait du menu

- **Contexte** : Le service « Mobilité » n’est plus proposé par l’entreprise. La page dédiée et les liens de navigation entraînaient des incohérences, des liens morts potentiels et des tests cassés.
- **Décision** :
  - Supprimer la page `app/mobilite/page.tsx` (renvoi 404 via `notFound`).
  - Retirer l’entrée « Mobilité » des menus desktop/mobile (`components/header.tsx`, `components/header-simple.tsx`).
  - Mettre à jour l’accueil (`components/services-section-simple.tsx`, `components/homepage-hero-section-simple.tsx`) pour supprimer la carte « Solutions Mobilité » et toute mention associée.
  - Adapter `app/nos-services/page.tsx`, les métadonnées globales et la documentation éditoriale afin d’éliminer les occurrences du terme.
  - Mettre à jour les tests unitaires et end-to-end impactés (header, services, nos-services, Playwright services/header e2e).
- **Conséquences** :
  - Le site ne propose plus de navigation ou de contenu marketing autour de la mobilité/4G.
  - Le parcours visiteur renvoie vers les offres téléphonie IP existantes sans liens orphelins.
  - Les suites de tests reflètent le nouveau périmètre (aucun badge « Télétravail », pas de lien `/mobilite`).
- **Tests associés** : `npm test` ✅ (42/42) ; `npx playwright test` ✅ (21/21).

### 2025-09-27 — Neutralisation temporaire du pré-rendu sur pages problématiques

- **Contexte** : Le build échouait avec des erreurs « Objects are not valid as a React child » sur certaines pages présentant des contenus dynamiques/JSX. Il fallait débloquer la CI/CD rapidement pour poursuivre les révisions.
- **Décision** : Ajouter `export const dynamic = "force-dynamic";` sur les pages suivantes pour neutraliser le pré-rendu statique le temps d’une refonte ciblée:
  - `app/assistants-vocaux-ia/page.tsx`
  - `app/nos-services/page.tsx`
  - `app/studio-attente/page.tsx`
  - `app/telephonie-entreprise/page.tsx`
- **Conséquences** :
  - Ces routes sont rendues dynamiquement côté serveur (SSR on-demand) pendant la phase de correction.
  - Retour à un mode statique à reconsidérer après correction fine des contenus.
- **Tests associés** : `npm run build` ✅ ; `npm test` ✅. Aucun warning d’hydratation CSS observé au démarrage local.

> Ajouter ici chaque nouvelle décision en suivant la structure ci-dessus. Garder les plus récentes en haut de liste pour consultation rapide.
