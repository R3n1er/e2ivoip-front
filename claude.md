# Claude Config — E2I VoIP

Lire aussi : `.agents.md` (règles techniques complètes)

## Langue

Toujours répondre en français, y compris les messages de statut, résumés et questions.

## Profil utilisateur (TDAH)

**Source de vérité : `ME.md`** — à lire en début de session.

L'essentiel : chef de projet, dev NextJS débutant. Réponses courtes, **une chose à la fois**, étapes numérotées (3 max), toujours résumer avant de proposer la suite, challenger l'approche si une meilleure voie existe. Pour les phases d'exploration / brainstorming : poser les questions **une par une**, dans un ordre logique, en partant de la réponse précédente — jamais plusieurs questions ouvertes en vrac.

## Références clés

- **Profil utilisateur & attentes** : `ME.md`
- Planification : `.planning/ROADMAP.md` + `.planning/STATE.md`
- Suivi décisions & historique des sessions : `memory.md`
- Décisions d'architecture : `docs/ADR.md`
- Architecture technique : `docs/ARCHITECTURE.md`
- Charte graphique : `docs/CHARTE_GRAPHIQUE.md` (RÈGLE ABSOLUE)
- Ligne éditoriale : `docs/ligne-editoriale.md`

## Mémoire de session

Les mémoires de session sont conservées dans **claude-mem** (capture
automatique). Les décisions d'architecture restent documentées dans
`docs/ADR.md`, versionné avec le code.

**Ne rien déposer dans le second cerveau** (`/Users/alban/Documents/SIKS-BRAIN/`) :
ni journal de sessions, ni ADR, ni draft dans `20-propositions/`. Ce flux
est abandonné pour ce projet.

## Règles absolues

1. Couleurs : jamais hors charte — vérifier `docs/CHARTE_GRAPHIQUE.md`
2. Hero gradient : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`
3. Charte (`CHARTE_GRAPHIQUE.md`, `.docx`, `BrandBrief`) : permission requise pour modifier
4. Pre-push : `npm run validate` obligatoire (6 contrôles — bloquer si 1 échoue)
5. TDD : RED → GREEN → REFACTOR → DOCUMENT → COMMIT → PR
6. **Pull Request obligatoire** : toute modif passe par une branche dédiée → PR vers `dev` (`gh pr create --base dev`). Jamais de commit direct sur `dev` ou `main`. Le merge est fait par l'agent **sur demande d'Alban**, jamais de sa propre initiative — et uniquement si les checks CI sont verts. Squash pour `→ dev`, merge classique pour `dev → main`. Détail : `agents.md` § « Livraison par Pull Request »
7. **Claudex-Loop : sur demande explicite uniquement** — jamais de sa propre initiative. Voir § « Claudex-Loop » ci-dessous.

## Claudex-Loop (plan durci avant grosse feature)

Plugin installé (`.claude/settings.json`). Fait relire un plan par **Codex (OpenAI)** en lecture
seule avant d'écrire du code — celui qui construit ne note jamais son propre travail.

**Déclenchement : uniquement quand Alban le demande** (`/claudex-loop`, « passe ça au claudex »).
L'agent ne le lance jamais spontanément, même sur une grosse feature.

| Utiliser pour | Ne pas utiliser pour |
|---|---|
| Nouvelle page ou refonte complète | Correction de texte, couleur, typo |
| Migration SEO structurelle (ex. renommage de route) | Ajustement de composant existant |
| Intégration externe (HubSpot, API tierce) | Bugfix localisé |
| Changement d'architecture ou de schéma de données | Mise à jour de dépendance |

**Place dans le workflow** — en amont du cycle TDD, jamais à la place :

```
/claudex-loop → PLAN.md validé → RED → GREEN → REFACTOR → DOCUMENT → COMMIT → PR
```

**Sorties** : `PLAN.md` (la décision) + `PLAN-REVIEW-LOG.md` (le débat Claude ↔ Codex).
Les décisions structurantes qui en sortent sont reportées dans `docs/ADR.md`.

**Prérequis** (vérifiés OK) : Codex CLI ≥ 0.130, `codex login` effectué, projet déclaré
`trusted` dans `~/.codex/config.toml`. En cas d'échec d'un round sur une erreur de modèle,
retirer la ligne `model = "..."` de `~/.codex/config.toml`.

## Permissions

- Auto (sans demander) : `app/`, `components/`, `lib/`, `tests/`, configs
- Permission requise : `docs/PRD.md`, `.env.production`, décisions stratégiques
