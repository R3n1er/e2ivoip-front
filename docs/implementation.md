# Plan d’implémentation – Mise à jour 2025-10-21

## Contexte

- La page `telephonie-3cx` devait adopter un logo 3CX centré sur fond blanc et des CTA alignés au centre.
- L’embed Tally sur `trunk-sip-compteur` ne chargeait pas en environnement headless (Playwright), entraînant un échec du test E2E `tally-popup.spec.ts`.

## Décisions techniques

1. **Hero 3CX**
   - Remplacement du badge textuel par le logo officiel 3CX via `next/image`.
   - Fond blanc arrondi + ombre (`shadow-lg`) pour garantir la lisibilité.
   - CTA de cartes PRO/SMB enveloppés dans `div.flex.justify-center` afin d’être centrés.

2. **Embed Tally**
   - `components/tally-embed-devis.tsx` : ajout de `src={TALLY_EMBED_URL}` en plus de `data-tally-src` pour garantir un rendu immédiat.
   - Conservation du script `tally.loadEmbeds()` pour les fonctionnalités dynamiques (événements, taille auto).

## Tests exécutés

- `npm test`
- `npx playwright test --grep "Tally Embed - Trunk SIP Compteur"`
- `npx playwright test`

## Actions futures

- Réduire les avertissements React (`act(...)`, `whileInView`) relevés lors de `npm test`.
- Ajouter des props `sizes` sur les images `next/image` signalées par Playwright.
- Continuer la rédaction de contenu détaillé pour chaque service (voir `docs/roadmap.md`, section 3.3).

