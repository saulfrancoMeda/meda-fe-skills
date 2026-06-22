#!/usr/bin/env bash
# Installs the 'meda-fe' command on your PATH (once per machine).
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; chmod +x "$ROOT_DIR/bin/meda-fe"
g=$'\033[0;32m'; y=$'\033[0;33m'; b=$'\033[0;34m'; off=$'\033[0m'
for d in "$HOME/.local/bin" "/usr/local/bin"; do [ -d "$d" ] && [ -w "$d" ] && T="$d" && break; done
[ -z "${T:-}" ] && { mkdir -p "$HOME/.local/bin"; T="$HOME/.local/bin"; }
ln -sf "$ROOT_DIR/bin/meda-fe" "$T/meda-fe"
printf "${g}✓${off} Command installed: %s/meda-fe\n" "$T"
case ":$PATH:" in *":$T:"*) :;; *) printf "${y}!${off} %s is not on your PATH. Add to ~/.zshrc:\n  ${b}export PATH=\"%s:\$PATH\"${off}\n" "$T" "$T";; esac
printf "\nDone. Now from any repo:\n  ${b}cd ~/your-repo && meda-fe scan${off}\n"
