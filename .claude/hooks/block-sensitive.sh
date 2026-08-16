#!/usr/bin/env bash
# Hook PreToolUse (Edit|Write|NotebookEdit) — bloque toute écriture sur un fichier sensible.
#
# Branché depuis .claude/settings.json → hooks.PreToolUse.
#
# Pourquoi un hook et pas seulement l'agent security-guardian :
# l'agent est probabiliste (il faut penser à l'appeler), le hook est déterministe.
#
# Cibles protégées :
#   - .env.keys / .env.local / .env*  → secrets NON versionnés (gitignore) : une écriture
#     accidentelle les détruit sans recours possible via git.
#   - package-lock.json               → tracké, mais doit être régénéré par npm, jamais
#     édité à la main (une édition manuelle casse l'intégrité des hashes).
#
# Contrat Claude Code : sortie 2 + message sur stderr = appel bloqué, message rendu à Claude.
# Toute autre sortie non nulle = hook considéré cassé, l'appel passerait quand même.

set -euo pipefail

# Lire l'événement JSON envoyé par Claude Code sur stdin.
input="$(cat)"

# Chemin ciblé par l'outil. Edit/Write utilisent file_path ; on garde notebook_path en secours.
file_path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_input.notebook_path // ""' 2>/dev/null || echo "")"

# Pas de chemin exploitable → on laisse passer (ne jamais bloquer sur un doute technique).
if [ -z "$file_path" ]; then
  exit 0
fi

# Ne raisonner que sur le nom de fichier : évite qu'un dossier nommé ".env" plus haut
# dans l'arborescence fasse matcher tous les fichiers qu'il contient.
basename_file="$(basename "$file_path")"

case "$basename_file" in
  # Tous les .env* SAUF les modèles destinés à être versionnés et édités.
  env.example|.env.example|.env.sample)
    exit 0
    ;;
  .env|.env.*|*.env|env.keys)
    reason="fichier d'environnement (secrets non versionnés : une écriture est irréversible)"
    ;;
  package-lock.json)
    reason="lockfile npm (à régénérer via 'npm install', jamais à éditer à la main)"
    ;;
  *)
    exit 0
    ;;
esac

# Blocage : message sur stderr, sortie 2.
cat >&2 <<EOF
⛔ Écriture bloquée sur « ${file_path} » — ${reason}.

Ce blocage vient du hook .claude/hooks/block-sensitive.sh (règle projet).

Que faire à la place :
  • Secrets      : demande à Alban de modifier le fichier lui-même, ou documente la
                   variable attendue dans env.example (celui-là est éditable).
  • package-lock : lance 'npm install <pkg>' — npm régénère le lockfile correctement.

Ne contourne pas ce hook via Bash (cat/sed/tee/heredoc) : le blocage est intentionnel.
EOF

exit 2
