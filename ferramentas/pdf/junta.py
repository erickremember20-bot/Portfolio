# -*- coding: utf-8 -*-
import os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
"""Junta as cinco páginas num PDF só, com sumário, metadados e imagens recomprimidas."""
import pymupdf, os, sys
from PIL import Image

SAIDA = '../../portfolio-erick-teixeira.pdf'
ORDEM = [('paginas/01-home.pdf','Home'),
         ('paginas/02-nega-nago.pdf','Nega Nagô'),
         ('paginas/03-thumbdrop.pdf','ThumbDrop'),
         ('paginas/04-ct-em-campo.pdf','CT em Campo'),
         ('paginas/05-canaltech-hub.pdf','Canaltech · Hub de links')]

doc = pymupdf.open(); marcas = []
for cam, tit in ORDEM:
    d = pymupdf.open(cam); marcas.append((tit, doc.page_count)); doc.insert_pdf(d); d.close()
doc.set_toc([[1, t, p+1] for t, p in marcas])
doc.set_metadata({'title':'Erick Teixeira · Portfólio 2026','author':'Erick Teixeira',
  'subject':'Product & design engineer — quatro cases documentados de ponta a ponta',
  'keywords':'design system, UX, UI, front-end, IA, Canaltech, portfolio',
  'creator':'erickteixeira.art'})
doc.save('/tmp/bruto.pdf', garbage=4, deflate=True)
n = doc.page_count; doc.close()
print('juntado: %d páginas · %.1f MB' % (n, os.path.getsize('/tmp/bruto.pdf')/1048576))

d = pymupdf.open('/tmp/bruto.pdf')
d.rewrite_images(dpi_target=150, quality=72)
d.subset_fonts()
d.save(SAIDA, garbage=4, deflate=True, clean=True)
d.close()
print('final: %.1f MB' % (os.path.getsize(SAIDA)/1048576))

# conferência: nenhuma página em branco, sumário e links no lugar
d = pymupdf.open(SAIDA)
vazias = []
for i, p in enumerate(d):
    pix = p.get_pixmap(dpi=36)
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    if len(im.getcolors(maxcolors=200000) or []) <= 4: vazias.append(i+1)
links = sum(1 for p in d for l in p.get_links() if l.get('uri'))
utm = sum(1 for p in d for l in p.get_links() if 'utm_source=pdf' in (l.get('uri') or ''))
print('páginas em branco:', vazias or 'nenhuma')
print('links clicáveis: %d  (com UTM para o site: %d)' % (links, utm))
print('sumário:', [(t, pg) for _, t, pg in d.get_toc()])
