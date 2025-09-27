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

> Ajouter ici chaque nouvelle décision en suivant la structure ci-dessus. Garder les plus récentes en haut de liste pour consultation rapide.
