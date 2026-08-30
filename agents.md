# Agents Operating Memo

## Langue

Toujours répondre en français à l'utilisateur.

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
9. Quand tout est vert et que l'ADR est à jour : commit sur une branche dédiée, puis **ouvrir une PR GitHub vers `dev`** (voir « Livraison par Pull Request »).

## Livraison par Pull Request (RÈGLE ABSOLUE)

**Toute modification du site passe obligatoirement par une Pull Request GitHub. Aucun commit direct sur `dev` ni sur `main`.**

Flux imposé : `branche dédiée` → **PR vers `dev`** → relecture, puis merge sur demande d'Alban → `dev` → `main` (également sur demande d'Alban).

1. Créer une branche dédiée depuis `dev` à jour :
   `git switch dev && git pull && git switch -c <type>/<sujet-court>`
   Préfixes : `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`.
2. Committer le travail sur cette branche (messages en français, format Conventional Commits).
3. `npm run validate` doit passer — **6 contrôles, bloquer si un seul échoue**.
4. Pousser et ouvrir la PR ciblant `dev` :
   `git push -u origin <branche>`
   `gh pr create --base dev --title "<titre>" --body "<corps>"`
5. Le corps de PR doit contenir : objectif, liste des changements, résultat des tests (Jest + Playwright), entrée ADR associée, points de vigilance / risques.
6. Rendre la main à Alban avec l'URL de la PR, puis **s'arrêter**.

**Merge** : l'agent ne merge jamais de sa propre initiative. Sur demande explicite d'Alban :
- Vérifier d'abord que les checks CI sont verts (`gh pr view <n> --json statusCheckRollup`) et la PR `MERGEABLE`.
- Vers `dev` : `gh pr merge <n> --squash --delete-branch`.
- `dev → main` : annoncer l'écart de commits (`git log origin/main..origin/dev`), puis `gh pr merge <n> --merge` — le merge classique évite de faire diverger `dev` et `main`.
- Vérifier le déploiement en production après un merge vers `main`.

**Interdictions strictes pour l'agent** :
- Ne jamais pousser sur `dev` ou `main` directement, même pour un « petit » correctif.
- Ne jamais forcer un push (`--force`) sur une branche partagée.
- Ne jamais utiliser `--admin` ou `--auto` pour passer outre un check en échec.

**Seule exception** : si Alban demande explicitement un commit direct sur `dev` ou `main` pour une intervention donnée. L'exception vaut pour cette intervention uniquement, jamais pour les suivantes.

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

- Profil utilisateur : **TDA** (trouble du déficit de l'attention), pas seulement TDAH. Réponses en français, courtes et numérotées (max 3 étapes) — profil débutant / TDAH
- **Brainstorming : poser les questions une par une**, dans un ordre logique, en partant de la réponse précédente. Jamais plusieurs questions ouvertes en vrac dans un même message.
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
- Next.js **16.3.1** + React 18.3.1 + ESLint 9 (flat config) — migration sécurité `npm audit`, août 2026 (ADR 2026-08-14)
- Migration SEO HubSpot → Next.js : **15 redirections 301** dans `next.config.js` pour les URLs de l'ancien site. À conserver **au moins 12 mois**. Vérification : `node scripts/verify-seo-migration.mjs <url>` (ADR 2026-08-15)
- Slugs d'articles HubSpot : l'API renvoie le **chemin complet** (`blog/mon-article`), pas le segment seul. Toujours passer par `normalizeSlug` / `slugMatches` (`lib/blog-source.ts`, `lib/hubspot-blog.ts`) — sinon les articles répondent 404

## Références Documentation

À lire selon le besoin, sans tout charger d'emblée :

| Sujet | Fichier |
|---|---|
| **Profil utilisateur & attentes de collaboration** | `ME.md` |
| Décisions, contexte projet, historique des sessions | `memory.md` |
| Décisions d'architecture (ADR) | `docs/ADR.md` |
| Règles techniques complètes | `.agents.md` |
| Config Claude Code | `claude.md` |
| Architecture technique | `docs/ARCHITECTURE.md` |
| Charte graphique (RÈGLE ABSOLUE) | `docs/CHARTE_GRAPHIQUE.md` |
| Ligne éditoriale | `docs/ligne-editoriale.md` |
| Planification | `.planning/ROADMAP.md`, `.planning/STATE.md` |

## Scan sécurité Semgrep (pre-push gate)

- **Semgrep** (`--config=auto`) scanne le code avant push vers `main` **et `dev`** via un hook git `pre-push`
- Bloque sur les findings **ERROR** et **HIGH** (OWASP Top 10 + best practices JS/TS/React/Next.js)
- Les findings **WARNING** et **INFO** sont affichés mais non bloquants
- Le hook vit dans `.githooks/pre-push` du repo — activé via `git config core.hooksPath .githooks`
- Contournement exceptionnel : `git push --no-verify` en connaissance de cause
- Login Semgrep : `semgrep login` (token stocké dans `~/.semgrep/settings.yml`)

### Vérifier que le hook est actif

```bash
git config core.hooksPath
# doit retourner: .githooks
```

Si vide, l'activer :
```bash
git config core.hooksPath .githooks
```

### Lancer Semgrep manuellement

```bash
semgrep --config=auto
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
