#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

run_in_new_terminal() {
  local title="$1"
  local command="$2"

  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || -n "${WINDIR:-}" ]]; then
    local win_root
    win_root="$(cygpath -w "$ROOT" 2>/dev/null || echo "$ROOT")"

    DEV_SH_ROOT="$win_root" \
    DEV_SH_TITLE="$title" \
    DEV_SH_CMD="$command" \
    MSYS2_ARG_CONV_EXCL='*' \
    powershell.exe -NoProfile -Command \
      '$cmd = "title $env:DEV_SH_TITLE && cd /d `"$env:DEV_SH_ROOT`" && $env:DEV_SH_CMD"; Start-Process cmd.exe -ArgumentList "/k", $cmd'
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    osascript -e "tell application \"Terminal\" to do script \"cd '$ROOT' && $command\""
  elif command -v gnome-terminal &>/dev/null; then
    gnome-terminal --title="$title" -- bash -lc "cd '$ROOT' && $command; exec bash"
  elif command -v xterm &>/dev/null; then
    xterm -T "$title" -e bash -lc "cd '$ROOT' && $command; exec bash" &
  else
    echo "Nenhum terminal compatível encontrado para abrir \"$title\"."
    exit 1
  fi
}

run_in_new_terminal "code-connect-api" "pnpm dev:api"
run_in_new_terminal "code-connect-web" "pnpm dev:web"

echo "API e Web iniciados em terminais separados."
