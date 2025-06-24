#!/bin/sh
# Git pre-commit hook to ensure nav.html is up to date

if git diff --cached --name-only | grep -q 'scripts/nav_items.json'; then
    echo "nav_items.json geändert - generiere nav.html"
    python3 scripts/generate_nav.py || exit 1
    git add nav.html
fi
