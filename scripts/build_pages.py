import json
from pathlib import Path
from string import Template

root = Path(__file__).resolve().parent.parent
with open(root / 'pages.json', encoding='utf-8') as f:
    pages = json.load(f)

with open(root / 'templates' / 'base.html', encoding='utf-8') as f:
    base_tpl = Template(f.read())

for page in pages:
    src = root / page['source']
    with open(src, encoding='utf-8') as f:
        body = f.read()
    html = base_tpl.substitute(title=page['title'],
                              description=page['description'],
                              body=body,
                              extra_head=page.get('extra_head', ''))
    with open(root / page['target'], 'w', encoding='utf-8') as f:
        f.write(html)
    print('generated', page['target'])
