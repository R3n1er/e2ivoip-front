#!/usr/bin/env bash
# Hook PostToolUse (Bash) — détecte un `git commit` réussi sur e2ivoip-front
# et injecte un rappel pour documenter la session dans le second cerveau SIKS-BRAIN.
#
# Branché depuis .claude/settings.local.json → hooks.PostToolUse (matcher "Bash").
# Le hook NE rédige PAS le journal : il invite Claude à le faire avec le contexte de session.

set -euo pipefail

# Fiche canon (LECTURE seule pour les agents — zone 10-wiki protégée par AGENTS.md).
# Corrigé le 2026-08-10 : le journal avait été déplacé de 20-propositions/ vers 10-wiki/.
JOURNAL="/Users/alban/Documents/SIKS-BRAIN/10-wiki/syntheses/e2i-voip-front-journal-sessions.md"

# Sas d'écriture : c'est ICI que les agents déposent leur draft, jamais dans le canon.
SAS="/Users/alban/Documents/SIKS-BRAIN/20-propositions/syntheses/e2i-voip-front-journal-sessions.md"

# Lire l'événement JSON envoyé par Claude Code sur stdin.
input="$(cat)"

# Extraire la commande exécutée et le code de sortie (jq requis).
command="$(printf '%s' "$input" | jq -r '.tool_input.command // ""' 2>/dev/null || echo "")"
exit_code="$(printf '%s' "$input" | jq -r '.tool_response.exit_code // .tool_response.exitCode // 0' 2>/dev/null || echo "0")"

# Ne réagir qu'aux VRAIS commits réussis.
# Filtre strict : la commande doit COMMENCER par `git commit` (éventuellement précédée
# d'un `cd ... &&` ou de `git -C <path>`), pour éviter les faux positifs où la chaîne
# "git commit" apparaît dans du texte (ex: append d'un log, echo, heredoc).
normalized="$(printf '%s' "$command" | sed -E 's/^[[:space:]]*//')"
case "$normalized" in
  "git commit"*|"git -C "*" commit"*|"git -c "*" commit"*) : ;;  # vrai commit
  *) exit 0 ;;                                                    # sinon on laisse passer
esac

# Exclure les commits "à blanc" qui ne créent rien.
case "$command" in
  *"--dry-run"*) exit 0 ;;
esac

# Échec du commit → ne rien faire.
if [ "$exit_code" != "0" ]; then
  exit 0
fi

# Récupérer le dernier commit (hash court + sujet) pour le rappel.
last_commit="$(git -C /Users/alban/Developer/e2ivoip-front log -1 --format='%h %s' 2>/dev/null || echo "(commit inconnu)")"

# Injecter le rappel via additionalContext (JSON sur stdout).
cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "📓 Commit détecté sur e2ivoip-front : ${last_commit}. Pense à documenter cette session dans le journal du second cerveau. Le journal canon est en LECTURE SEULE (${JOURNAL}) : AGENTS.md interdit toute écriture directe en 10-wiki/. Écris donc un draft dans le sas : ${SAS}, avec frontmatter 'status: proposed', 'proposed-by: claude-opus-YYYY-MM-DD' et 'proposes-update: 10-wiki/syntheses/e2i-voip-front-journal-sessions.md'. Le draft contient UNIQUEMENT l'entrée à insérer en haut de la section '## Sessions' du canon, au format : commits, ce qui a été fait, décisions/pièges, prochaines actions — plus la nouvelle valeur de 'date-maj'. Alban promeut ensuite via /promote. Logge l'action dans /Users/alban/Documents/SIKS-BRAIN/90-meta/log.md (append : '- YYYY-MM-DDTHH:MM claude-opus-5 draft <chemin-sas> — <résumé>')."
  }
}
EOF

exit 0
