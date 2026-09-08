# -*- coding: utf-8 -*-
"""Converte tudo que está em assets/ para WebP dentro de docs/assets."""
import os, re, shutil, sys, json
from PIL import Image, ImageSequence
import os, sys
# a raiz do projeto é a pasta acima desta
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SD   = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(RAIZ, 'docs')

PAGS=['index.html','nega-nago.html','ct-em-campo.html','canaltech-hub.html']

# ---- 1. larguras declaradas de cada asset (o maior uso em todas as páginas)
larg={}
for p in PAGS:
    h=open(os.path.join(RAIZ,p),encoding='utf-8').read()
    for m in re.finditer(r'<img[^>]*?>', h, re.S):
        tag=m.group(0)
        src=re.search(r'src="assets/([^"]+)"',tag)
        w=re.search(r'width="(\d+)"',tag)
        if src:
            k=src.group(1)
            larg[k]=max(larg.get(k,0), int(w.group(1)) if w else 0)

# logos e ícones usados via CSS/markup sem width
for k in list(larg):
    if larg[k]==0: larg[k]=1160

shutil.rmtree(DIST, ignore_errors=True)
os.makedirs(os.path.join(DIST,'assets','fonts'), exist_ok=True)

mapa={}
tot_ant=tot_dep=0
for nome in sorted(larg):
    orig=os.path.join(RAIZ,'assets',nome)
    if not os.path.exists(orig):
        print('  falta', nome); continue
    ext=os.path.splitext(nome)[1].lower()
    tam_ant=os.path.getsize(orig); tot_ant+=tam_ant
    im=Image.open(orig)
    anim = getattr(im,'n_frames',1)>1
    alvo = larg[nome] if anim else min(larg[nome]*2, 2320)
    novo = os.path.splitext(nome)[0]+'.webp'
    dest = os.path.join(DIST,'assets',novo)
    if anim:
        quadros=[];durs=[]
        for f in ImageSequence.Iterator(im):
            q=f.convert('RGBA')
            if q.width>alvo:
                q=q.resize((alvo,round(q.height*alvo/q.width)), Image.LANCZOS)
            quadros.append(q); durs.append(f.info.get('duration',80) or 80)
        quadros[0].save(dest, save_all=True, append_images=quadros[1:],
                        duration=durs, loop=0, quality=50, method=4)
    else:
        alpha = im.mode in ('RGBA','LA','P') and 'transparency' in im.info or im.mode in ('RGBA','LA')
        q=im.convert('RGBA' if alpha else 'RGB')
        if q.width>alvo:
            q=q.resize((alvo,round(q.height*alvo/q.width)), Image.LANCZOS)
        q.save(dest, quality=88 if alpha else 82, method=6)
    tam_dep=os.path.getsize(dest); tot_dep+=tam_dep
    mapa[nome]=novo
    print(f'  {nome:42s} {tam_ant//1024:6d} KB -> {tam_dep//1024:6d} KB  ({alvo}px{" anim" if anim else ""})')

print(f'TOTAL {tot_ant//1024//1024} MB -> {tot_dep//1024//1024} MB')
json.dump(mapa, open(os.path.join(SD,'mapa.json'),'w'))
