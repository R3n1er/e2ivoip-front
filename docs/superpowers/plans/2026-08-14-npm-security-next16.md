# Sécurité npm et migration Next.js 16 — Plan d'implémentation

**Objectif :** supprimer toutes les vulnérabilités npm sans utiliser `npm audit fix --force` et préserver le comportement du site.

## Étapes

- [x] Auditer les arbres npm racine et `scripts/`, puis appliquer les corrections transitives non destructives.
- [x] Migrer Next.js et son outillage associé vers `16.3.1` en conservant React `18.3.1` pour la compatibilité UI.
- [x] Migrer ESLint 9 vers le flat config natif de Next.js 16 et adapter les scripts Turbopack/Webpack.
- [x] Migrer Puppeteer `21.11.0` vers `25.7.0` et valider l'extraction réelle du blog.
- [x] Valider lint, TypeScript, 332 tests Jest, 80 tests Playwright, build de 44 routes et démarrage sans erreur d'hydratation.
- [x] Confirmer `npm audit` à zéro vulnérabilité et documenter la décision dans `docs/ADR.md`.

## Résultat

Migration terminée le 14 août 2026. Aucun commit ni push n'est inclus dans cette intervention.
