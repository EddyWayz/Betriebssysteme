import glob
import re
import sys

missing = []
for path in glob.glob('*.html'):
    if path == 'nav.html':
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read()
    for match in re.finditer(r'<img[^>]*>', content):
        tag = match.group(0)
        if 'alt=' not in tag:
            missing.append(f"{path}: {tag}")

if missing:
    print('Fehlende alt-Attribute bei Bildern in:')
    for m in missing:
        print('  ' + m)
    sys.exit(1)
else:
    print('Alle Bilder besitzen ein alt-Attribut.')
