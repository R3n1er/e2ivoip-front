# Architecture Decision Record (ADR)

Ce fichier centralise les décisions importantes prises sur le projet. Chaque entrée doit mentionner :

- **Date**
- **Contexte**
- **Décision**
- **Conséquences**
- **Tests associés**

## Historique

### 2025-09-27 — Alignement de la version Node.js
- **Contexte** : les environnements locaux utilisaient des versions hétérogènes de Node.js (pas de `.nvmrc`), ce qui provoquait des écarts de comportement avec Next.js 15.
- **Décision** : standardiser la stack sur Node.js 22.12.0 (LTS) via un nouveau fichier `.nvmrc` et mettre à jour la documentation développeur.
- **Conséquences** : les contributeurs doivent utiliser Node.js 22.12.0 ; aucune configuration CI existante n'a été détectée et reste donc à aligner si elle apparaît ultérieurement.
- **Tests associés** : `npm install` ✅ ; `npm test` ❌ (échecs existants : usages de `vi`/`jest` non définis dans plusieurs suites, ex. `tests/image-optimization.test.tsx`, `tests/core-web-vitals.test.tsx`) ; `npx playwright test` ❌ (tests exécutés avec Jest sans globals configurés) ; `npm run dev` (2x) ✅ sans avertissements CSS ni hydratation anormale.

### 2025-09-27 — Suppression du service « Mobilité » et retrait du menu
- **Contexte** : Le service « Mobilité » n’est plus proposé par l’entreprise. La page dédiée et les liens de navigation entraînaient des incohérences, des liens morts potentiels et des tests cassés.
- **Décision** :
  - Supprimer la page `app/nos-services/mobilite/page.tsx`.
  - Retirer l’entrée « Mobilité » du menu principal dans `components/header.tsx`.
  - Mettre à jour `app/nos-services/page.tsx` pour retirer la carte « Solutions Mobilité », ajuster les catégories (suppression « Mobilité ») et supprimer le prix « Inclus » associé.
  - Mettre à jour les tests unitaires impactés (header et nos-services).
- **Conséquences** :
  - Plus de lien « Mobilité » dans le header (desktop/mobile) ni sur la page « Nos services ».
  - Les tests ne doivent plus vérifier la présence de libellés « Mobilité » et « Télétravail » (badge).
- **Tests associés** : `npm test` ✅ (42/42). `npm run build` ✅.

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
