import glob
import re

missing = []
for path in glob.glob('*.html'):
    if path == 'nav.html':
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read(200)
    if not re.search(r'<html[^>]*lang="de"', content):
        missing.append(path)

if missing:
    print("Fehlende lang-Attribute:", ', '.join(missing))
    exit(1)
print("Alle HTML-Dateien besitzen ein lang-Attribut.")

