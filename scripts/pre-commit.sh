#!/bin/sh
# Git pre-commit hook to ensure nav.html is up to date and run tests

echo "Running pre-commit hook..."

# Check if nav_items.json has changed and regenerate nav.html if needed
if git diff --cached --name-only | grep -q 'scripts/nav_items.json'; then
    echo "nav_items.json changed - regenerating nav.html"
    python3 scripts/generate_nav.py
    if [ $? -ne 0 ]; then
        echo "Error generating nav.html. Aborting commit."
        exit 1
    fi
    git add nav.html
    echo "nav.html regenerated and added to commit."
fi

# Run all Python tests in the tests/ directory
echo "Running tests..."
python3 tests/check_alt.py && \
python3 tests/check_lang.py && \
python3 tests/check_links.py

if [ $? -ne 0 ]; then
    echo "One or more tests failed. Aborting commit."
    exit 1
fi

echo "All tests passed."
echo "Pre-commit hook finished successfully."
exit 0
