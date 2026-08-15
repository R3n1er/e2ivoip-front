# Claude Config — E2I VoIP

Lire aussi : `.agents.md` (règles techniques complètes)

## Profil utilisateur (TDAH)

**Source de vérité : `ME.md`** — à lire en début de session.

L'essentiel : chef de projet, dev NextJS débutant. Réponses courtes, **une chose à la fois**, étapes numérotées (3 max), toujours résumer avant de proposer la suite, challenger l'approche si une meilleure voie existe.

## Références clés

- **Profil utilisateur & attentes** : `ME.md`
- Planification : `.planning/ROADMAP.md` + `.planning/STATE.md`
- Suivi décisions & historique des sessions : `memory.md`
- Décisions d'architecture : `docs/ADR.md`
- Architecture technique : `docs/ARCHITECTURE.md`
- Charte graphique : `docs/CHARTE_GRAPHIQUE.md` (RÈGLE ABSOLUE)
- Ligne éditoriale : `docs/ligne-editoriale.md`
- Second cerveau : `/Users/alban/Documents/SIKS-BRAIN/` (lire AGENTS.md avant toute op.)

## Règles absolues

1. Couleurs : jamais hors charte — vérifier `docs/CHARTE_GRAPHIQUE.md`
2. Hero gradient : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`
3. Charte (`CHARTE_GRAPHIQUE.md`, `.docx`, `BrandBrief`) : permission requise pour modifier
4. Pre-push : `npm run validate` obligatoire (6 contrôles — bloquer si 1 échoue)
5. TDD : RED → GREEN → REFACTOR → DOCUMENT → COMMIT

## Permissions

- Auto (sans demander) : `app/`, `components/`, `lib/`, `tests/`, configs
- Permission requise : `docs/PRD.md`, `.env.production`, décisions stratégiques
