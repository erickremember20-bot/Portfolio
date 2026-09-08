# -*- coding: utf-8 -*-
"""Copia as quatro páginas para docs/ com src em .webp e as fontes servidas do próprio domínio."""
import os, re, json, shutil
import os, sys
# a raiz do projeto é a pasta acima desta
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SD   = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(RAIZ, 'docs')
PAGS=['index.html','nega-nago.html','ct-em-campo.html','canaltech-hub.html']
mapa=json.load(open(os.path.join(SD,'mapa.json')))
local=open(os.path.join(SD,'fontes-web','local.css')).read()

os.makedirs(os.path.join(DIST,'assets','fonts'),exist_ok=True)
for f in os.listdir(os.path.join(SD,'fontes-web','f')):
    shutil.copy(os.path.join(SD,'fw','f',f), os.path.join(DIST,'assets','fonts',f))
shutil.copy(os.path.join(RAIZ,'assets','case.css'), os.path.join(DIST,'assets','case.css'))
shutil.copy(os.path.join(RAIZ,'assets','case.js'),  os.path.join(DIST,'assets','case.js'))

fontes_tag = ('<style>\n/* Sora e JetBrains Mono servidas do próprio domínio: sem requisição\n'
              '   para terceiros e sem depender do Google Fonts. */\n' + local + '</style>')

for p in PAGS:
    s=open(os.path.join(RAIZ,p),encoding='utf-8').read()
    # 1. troca as imagens
    for velho,novo in mapa.items():
        s=s.replace('assets/'+velho, 'assets/'+novo)
    # 2. fontes locais
    s=re.sub(r'<link rel="preconnect" href="https://fonts\.googleapis\.com"[^>]*/>\s*', '', s)
    s=re.sub(r'<link rel="preconnect" href="https://fonts\.gstatic\.com"[^>]*/>\s*', '', s)
    s=re.sub(r'<link href="https://fonts\.googleapis\.com/css2[^"]*" rel="stylesheet" />', fontes_tag, s)
    open(os.path.join(DIST,p),'w',encoding='utf-8').write(s)
    print(p, len(s)//1024,'KB')

# 3. .htaccess com cache e compressão — o que a Hostinger entende
open(os.path.join(DIST,'.htaccess'),'w').write('''# Cache longo para os assets versionados e compressão do HTML/CSS/JS.
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/css   "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
  ExpiresByType text/html  "access plus 0 seconds"
</IfModule>
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
</IfModule>
ErrorDocument 404 /index.html
''')
# 4. GitHub Pages serve a pasta como está, sem Jekyll
open(os.path.join(DIST,'.nojekyll'),'w').write('')
print('docs/ pronto')
