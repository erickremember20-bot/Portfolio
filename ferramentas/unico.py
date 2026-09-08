# -*- coding: utf-8 -*-
"""Junta as quatro páginas de docs/ em um único HTML autossuficiente na raiz."""
import os, re, base64, json, mimetypes
from escopo import escopar
import os, sys
# a raiz do projeto é a pasta acima desta
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SD   = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(RAIZ, 'docs')

SAIDA=os.path.join(RAIZ,'portfolio-erick-teixeira.html')
PAGS=[('home','index.html'),('nega','nega-nago.html'),
      ('ct','ct-em-campo.html'),('hub','canaltech-hub.html')]
ARQ2ID={a:i for i,a in PAGS}

# ---------- fontes em base64, uma vez só ----------
faces=open(os.path.join(SD,'fontes-web','local.css')).read()
def emb_fonte(m):
    cam=os.path.join(DIST, m.group(1))
    d=base64.b64encode(open(cam,'rb').read()).decode()
    return f"url(data:font/woff2;base64,{d})"
faces=re.sub(r'url\((assets/fonts/[^)]+)\)', emb_fonte, faces)

# ---------- imagens em base64, uma vez só ----------
cache={}
def dataurl(rel):
    if rel in cache: return cache[rel]
    cam=os.path.join(DIST, rel)
    tipo=mimetypes.guess_type(cam)[0] or 'application/octet-stream'
    if rel.endswith('.webp'): tipo='image/webp'
    d=base64.b64encode(open(cam,'rb').read()).decode()
    cache[rel]=f'data:{tipo};base64,{d}'
    return cache[rel]

case_css=open(os.path.join(DIST,'assets','case.css'),encoding='utf-8').read()
i18n_js=open(os.path.join(DIST,'assets','i18n.js'),encoding='utf-8').read()

partes_css=[]; partes_html=[]; titulos={}
for pid, arq in PAGS:
    s=open(os.path.join(DIST,arq),encoding='utf-8').read()
    titulos[pid]=re.search(r'<title>(.*?)</title>', s, re.S).group(1).strip()
    # css da página
    css=''
    if 'assets/case.css' in s: css+=case_css+'\n'
    for m in re.finditer(r'<style>(.*?)</style>', s, re.S):
        css+=m.group(1)+'\n'
    # tira o bloco de @font-face embutido (vai global)
    css=re.sub(r'@font-face\{[^}]*\}\s*','',css)
    partes_css.append(f'/* ===== {arq} ===== */\n'+escopar(css, f'.pg[data-p="{pid}"]'))

    corpo=re.search(r'<body>(.*)</body>', s, re.S).group(1)
    # 1) âncoras internas e ids ganham o prefixo da página
    corpo=re.sub(r'\bid="([A-Za-z][\w-]*)"', lambda m: f'id="{pid}-{m.group(1)}"', corpo)
    corpo=re.sub(r'href="#([A-Za-z][\w-]*)"', lambda m: f'href="#{pid}-{m.group(1)}"', corpo)
    # 2) só depois os links entre páginas viram o hash da página destino
    for outro_arq, outro_id in ARQ2ID.items():
        corpo=corpo.replace(f'href="{outro_arq}"', f'href="#{outro_id}"')
    # imagens
    corpo=re.sub(r'src="(assets/[^"]+)"', lambda m: f'src="{dataurl(m.group(1))}"', corpo)
    # o script de cada página sai; um só, global, entra no fim
    corpo=re.sub(r'<script>.*?</script>', '', corpo, flags=re.S)
    corpo=re.sub(r'<script src="[^"]*"></script>', '', corpo)
    partes_html.append(f'<div class="pg" data-p="{pid}"{"" if pid=="home" else " hidden"}>\n{corpo}\n</div>')

script = '''
(function(){
  'use strict';
  var TIT = %s;
  var pgs = [].slice.call(document.querySelectorAll('.pg'));
  function mostrar(id, alvo){
    var achou = false;
    pgs.forEach(function(p){
      var e = p.dataset.p === id;
      p.hidden = !e;
      if (e) achou = true;
    });
    if (!achou) return false;
    document.title = TIT[id] || TIT.home;
    if (window.__i18n) window.__i18n.reposicionar();
    if (alvo) {
      var el = document.getElementById(alvo);
      if (el) { el.scrollIntoView({behavior:'auto', block:'start'}); return true; }
    }
    window.scrollTo(0,0);
    return true;
  }
  function rotear(){
    var h = (location.hash || '#home').slice(1);
    var id = h.split('-')[0];
    if (!mostrar(id, h.indexOf('-') > -1 ? h : null)) mostrar('home');
  }
  window.addEventListener('hashchange', rotear);
  rotear();

  /* copiar e-mail */
  var toastEl = document.getElementById('toast'), t;
  function toast(m){ if(!toastEl) return; toastEl.textContent=m;
    toastEl.setAttribute('data-show',''); clearTimeout(t);
    t=setTimeout(function(){toastEl.removeAttribute('data-show');},2400); }
  [].forEach.call(document.querySelectorAll('[data-email]'), function(b){
    var alvo=b.querySelector('.btn__t'), orig=alvo?alvo.textContent:'', volta;
    b.addEventListener('click', function(){
      var mail=b.getAttribute('data-email');
      var feito=function(){ if(alvo) alvo.textContent='E-mail copiado';
        toast('E-mail copiado: '+mail); clearTimeout(volta);
        volta=setTimeout(function(){ if(alvo) alvo.textContent=orig; },2400); };
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(mail).then(feito,feito);
      } else {
        var ta=document.createElement('textarea'); ta.value=mail;
        ta.style.position='fixed'; ta.style.opacity='0';
        document.body.appendChild(ta); ta.select();
        try{document.execCommand('copy');}catch(e){}
        document.body.removeChild(ta); feito();
      }
    });
  });

  /* destaque do menu na seção visível */
  if ('IntersectionObserver' in window) {
    pgs.forEach(function(p){
      var links={};
      [].forEach.call(p.querySelectorAll('.menu a'), function(a){
        links[a.getAttribute('href').slice(1)]=a; });
      var alvos=[].slice.call(p.querySelectorAll('section[id]'));
      if(!alvos.length) return;
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ var a=links[e.target.id];
          if(a) a.style.color = e.isIntersecting ? 'var(--ink)' : ''; });
      },{rootMargin:'-45%% 0px -50%% 0px'});
      alvos.forEach(function(s){ io.observe(s); });
    });
  }
})();
''' % json.dumps(titulos, ensure_ascii=False)

doc = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#f1f1f1" />
<title>{titulos['home']}</title>
<meta name="description" content="Portfólio de Erick Teixeira — product &amp; design engineer. Três cases documentados de ponta a ponta." />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2321262a'/%3E%3Ctext x='16' y='22' font-family='system-ui,sans-serif' font-size='17' font-weight='700' fill='%23f1f1f1' text-anchor='middle'%3EE%3C/text%3E%3C/svg%3E" />
<style>
{faces}
html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:#f1f1f1}}
.pg[hidden]{{display:none!important}}
</style>
<style>
{chr(10).join(partes_css)}
</style>
</head>
<body>
{chr(10).join(partes_html)}
<div class="toast" id="toast" role="status" aria-live="polite"
     style="position:fixed;left:50%;bottom:28px;z-index:60;transform:translate(-50%,8px);
     background:#21262a;color:#f1f1f1;padding:12px 18px;border-radius:12px;font-size:14px;
     font-family:'Sora',system-ui,sans-serif;opacity:0;pointer-events:none;
     transition:opacity .18s,transform .18s"></div>
<style>.toast[data-show]{{opacity:1!important;transform:translate(-50%,0)!important}}</style>
<script>{i18n_js}</script>
<script>{script}</script>
</body>
</html>
'''
open(SAIDA,'w',encoding='utf-8').write(doc)
print(SAIDA, round(os.path.getsize(SAIDA)/1024/1024,1),'MB')
