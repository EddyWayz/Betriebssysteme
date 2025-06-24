import glob
import os
import re
import sys

missing = []
for path in glob.glob('*.html'):
    if path == 'nav.html':
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read()
    for m in re.finditer(r'href="([^"]+)"', content):
        href = m.group(1)
        if href.startswith(('http://', 'https://', '#', 'mailto:')):
            continue
        if href.endswith('.html') and not os.path.exists(href):
            missing.append(f"{path} -> {href}")

if missing:
    print('Fehlende oder ungültige Links:')
    for m in missing:
        print('  ' + m)
    sys.exit(1)
else:
    print('Alle internen Links sind erreichbar.')
