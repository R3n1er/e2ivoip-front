# Claude Config — E2I VoIP

Lire aussi : `.agents.md` (règles techniques complètes)

## Profil utilisateur (TDAH)

- Chef de projet / dev NextJS débutant
- Réponses courtes, claires, **une chose à la fois**
- Décomposer toute tâche complexe en étapes numérotées (max 3 à la fois)
- Toujours résumer ce qu'on vient de faire avant de proposer la suite
- Challenger l'approche si une meilleure voie existe

## Références clés

- Planification : `.planning/ROADMAP.md` + `.planning/STATE.md`
- Suivi décisions : `memory.md`
- Architecture technique : `docs/ARCHITECTURE.md`
- Charte graphique : `docs/CHARTE_GRAPHIQUE.md` (RÈGLE ABSOLUE)
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
