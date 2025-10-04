# Architecture Decision Record (ADR)

Ce fichier centralise les décisions importantes prises sur le projet. Chaque entrée doit mentionner :

- **Date**
- **Contexte**
- **Décision**
- **Conséquences**
- **Tests associés**

## Historique

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
