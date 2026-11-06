#!/usr/bin/env bash
# Hook SessionStart — fraîcheur avant tout travail.
# git fetch, puis alerte si ce poste est en retard sur le dépôt partagé.
# Ne bloque jamais : hors ligne, sans remote ou sans upstream, on se tait
# (ou on le signale), mais la session démarre quand même.

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

export GIT_TERMINAL_PROMPT=0 GIT_SSH_COMMAND="${GIT_SSH_COMMAND:-ssh -o BatchMode=yes -o ConnectTimeout=5}"

if ! git fetch --quiet 2>/dev/null; then
  echo "⚠️ Fraîcheur invérifiable : git fetch a échoué (hors ligne ?). Ce que tu lis dans ce dépôt est possiblement périmé — le signaler avant tout travail."
  exit 0
fi

branche=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
amont=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)

if [ -n "$amont" ]; then
  read -r derriere devant < <(git rev-list --left-right --count "HEAD...$amont" 2>/dev/null | awk '{print $2, $1}')
  if [ "${derriere:-0}" -gt 0 ]; then
    msg="⚠️ Dépôt en retard : la branche $branche a $derriere commit(s) de retard sur $amont"
    [ "${devant:-0}" -gt 0 ] && msg="$msg (et $devant commit(s) local(aux) non poussé(s) — branches divergentes)"
    echo "$msg. Lancer \`git pull --rebase --autostash\` avant tout travail, sinon le travail part d'un état périmé et finira en conflit."
  fi
fi

# Branche de travail : signaler aussi le retard sur la branche par défaut.
defaut=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null)
if [ -n "$defaut" ] && [ "$amont" != "$defaut" ]; then
  n=$(git rev-list --count "HEAD..$defaut" 2>/dev/null || echo 0)
  [ "$n" -gt 0 ] && echo "ℹ️ La branche $branche a $n commit(s) de retard sur $defaut (à rebaser si le travail en dépend)."
fi

exit 0
