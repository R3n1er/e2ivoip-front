# Agents Operating Memo

## Objectif

- Rassembler les consignes essentielles pour limiter le contexte nécessaire aux agents (Codex, IA argentique).
- Centraliser la procédure de livraison afin d'éviter les répétitions dans les discussions et PR.

## Processus Fonctionnalité

1. Développer la fonctionnalité en respectant la charte produit.
2. Stopper le serveur de développement, **libérer le port 3000** (`lsof -ti :3000 | xargs kill -9 2>/dev/null || true`), puis relancer pour repartir d'un cache vide avant de lancer les tests.
3. Écrire ou mettre à jour les tests unitaires couvrant le comportement métier.
4. Ajouter ou mettre à jour les tests Playwright garantissant que l'affichage correspond aux attentes.
5. Lancer la phase de test pour vérifier que toutes les fonctionnalités développées sont OK.
6. Vérifier l'hydratation CSS (aucun warning/erreur au lancement du serveur de développement).
7. Documenter l'évolution dans `docs/ADR.md` (nouvelle décision, impacts, tests).
8. Mettre à jour la roadmap et le plan d'implémentation.
9. Quand tout est vert et que l'ADR est à jour : commit, puis push vers GitHub.

## Validation Rapide

- `npm test`
- `npx playwright test`
- Démarrage local : `npm run dev` (Turbopack, port 3000)
- Redémarrage : `Ctrl+C`, libérer le port 3000 si besoin, puis `npm run dev`

## Notes

- Ces règles condensent les directives décrites sur https://agents.md/ et https://agentsmd.net/.
- En cas d'exception produit, documenter ici pour éviter de rallonger le contexte dans les futures missions.

## Stack & Priorities

- **Testing**: TDD with Jest + MCP Playwright + Browser MCP
- **State**: Zustand pour la gestion d'états UI (loading/erreur, flags)

## Documentation Rules

- Document in /docs automatically (inclure l'usage de Zustand si pertinent)

## Learned User Preferences

- Réponses en français, courtes et numérotées (max 3 étapes) — profil débutant / TDAH
- UI alignée sur la maquette Google Stitch et la charte (`docs/DESIGN.md`, `docs/CHARTE_GRAPHIQUE.md`)
- Serveur de dev : `npm run dev` utilise Turbopack (`--turbo`) — requis depuis Next 15.5 pour éviter l’erreur Webpack `reading 'call'` en dev
- Tests UI via Playwright ; vérifier l’hydratation CSS après modification de pages ou layouts
- Header desktop dès `lg` (1024px) ; hamburger uniquement en mobile/tablette (< lg)
- Rédaction SEO : cibler explicitement Guadeloupe, Martinique, Guyane, La Réunion / DOM sur home et pages services
- Éviter la répétition entre badge hero et paragraphe d’intro sur la home
- Pas de commit ni push sans demande explicite
- Corrections sécurité npm : `npm audit fix`, puis montée explicite des paquets (ex. `next@15.5.18`) validée par `npm run validate` ; éviter `npm audit fix --force` sans accord

## Learned Workspace Facts

- Blog public : source unique HubSpot CMS API — **`.env.local` minimal** : `HUBSPOT_ACCESS_TOKEN` (Private App `pat-eu1-…`) ; pas de `CLIENT_SECRET` pour le blog ; OAuth optionnel pour `/admin/hubspot` (ADR 2026-05-23)
- Offre téléphonie mobile `/mobilite` supprimée ; ne plus la proposer comme produit actif
- Pivot produit : plus d’offre « Assistants vocaux IA » directe ; Trunk SIP pour interconnexion agents vocaux IA + numéros locaux DOM (VAPI, Retell, ElevenLabs, Jambonz, etc.)
- URLs canoniques : `/studio-attente`, `/telephonie-3cx` (301 depuis anciennes routes)
- Positionnement marque : « Opérateur de services télécom · Spécialiste des DOM »
- Studio vocal : standards téléphoniques (accueil, SVI, attente, fermeture) + portail automatisé démos
- Page « Qui sommes-nous » : `app/qui-sommes-nous/page.tsx`
- Header actif : `components/layout/header-simple.tsx` (style Monolithe / Stitch)
- Next.js **15.5.18** + `eslint-config-next` aligné (montée sécurité post-`npm audit`, mai 2026)
