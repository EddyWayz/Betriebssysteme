import json
from string import Template
from pathlib import Path

root = Path(__file__).resolve().parent.parent
with open(root / 'scripts' / 'nav_items.json', encoding='utf-8') as f:
    items = json.load(f)
with open(root / 'scripts' / 'nav_template.html', encoding='utf-8') as f:
    tpl = Template(f.read())
links = "\n    ".join(f'<a href="{it["href"]}">{it["text"]}</a>' for it in items)
result = tpl.substitute(links=links)
with open(root / 'nav.html', 'w', encoding='utf-8') as f:
    f.write(result)
print('Generated nav.html with', len(items), 'links')
