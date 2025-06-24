nav.html: scripts/nav_items.json scripts/nav_template.html scripts/generate_nav.py
	python3 scripts/generate_nav.py

search_index.json: $(wildcard *.html)
	python3 scripts/build_search_index.py

.PHONY: nav test

test:
	python3 tests/check_lang.py
	python3 tests/check_alt.py
	python3 tests/check_links.py
