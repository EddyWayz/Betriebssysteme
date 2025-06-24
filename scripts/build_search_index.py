import glob
import json
import re

index = []
pattern = re.compile(r'<(h[1-3]|p)[^>]*>(.*?)<', re.IGNORECASE)
title_pattern = re.compile(r'<title>(.*?)<', re.IGNORECASE)
for path in glob.glob('0*_*.html') + glob.glob('index.html') + glob.glob('uebungen.html'):
    with open(path, encoding='utf-8') as f:
        content = f.read()
    texts = [m.group(2) for m in pattern.finditer(content)]
    text = ' '.join(re.sub('<[^<]+?>', '', t) for t in texts)
    m = title_pattern.search(content)
    title = m.group(1) if m else path
    index.append({'title': title, 'href': path, 'text': text})

with open('search_index.json', 'w', encoding='utf-8') as f:
    json.dump(index, f, ensure_ascii=False)
print('Generated search_index.json with', len(index), 'entries')
