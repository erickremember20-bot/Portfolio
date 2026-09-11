/* ==========================================================================
   PT / EN — troca de idioma sem recarregar a página.
   O dicionário é PT → EN; o português continua sendo o que está no HTML,
   então a página funciona igual se este arquivo não carregar.
   ========================================================================== */
(function () {
  'use strict';
  var DIC = window.__DIC_EN || {};
  var CHAVE = 'erick.idioma';
  var EMLINHA = { B:1, I:1, EM:1, STRONG:1, CODE:1, SPAN:1, BR:1, SUP:1, SUB:1, SMALL:1, A:1, ABBR:1 };
  var BLOCO = /<(div|p|h1|h2|h3|h4|section|figure|img|ul|li|svg)\b/i;
  var ATRIBUTOS = ['alt', 'aria-label', 'data-desc', 'title'];

  function limpo(s) { return s.replace(/\s+/g, ' ').trim(); }

  /* idioma atual: o que a pessoa escolheu antes; se nunca escolheu, inglês */
  var atual;
  try { atual = localStorage.getItem(CHAVE); } catch (e) { atual = null; }
  if (atual !== 'pt' && atual !== 'en') atual = 'en';

  /* guarda o português original de cada nó na primeira passada */
  var origem = new WeakMap();
  var origemAttr = new WeakMap();
  var tituloPT = document.title;
  var metasPT = {};

  function unidades() {
    var lista = [];
    var todos = document.querySelectorAll('body *');
    for (var i = 0; i < todos.length; i++) {
      var el = todos[i];
      if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
      if (el.closest('svg') || el.closest('[data-i18n-skip]')) continue;
      var filhos = el.children, ok = true;
      for (var j = 0; j < filhos.length; j++) {
        if (!EMLINHA[filhos[j].tagName]) { ok = false; break; }
      }
      if (!ok) continue;
      if (!limpo(el.textContent)) continue;
      var pai = el.parentElement;
      if (pai && pai.tagName !== 'BODY') {
        var paiEhUnidade = true, pf = pai.children;
        for (var k = 0; k < pf.length; k++) {
          if (!EMLINHA[pf[k].tagName]) { paiEhUnidade = false; break; }
        }
        if (paiEhUnidade && !BLOCO.test(limpo(pai.innerHTML))) continue;
      }
      if (BLOCO.test(limpo(el.innerHTML))) continue;
      lista.push(el);
    }
    return lista;
  }

  function aplicar(idioma) {
    var els = unidades(), i, j;
    for (i = 0; i < els.length; i++) {
      var el = els[i];
      if (!origem.has(el)) origem.set(el, el.innerHTML);
      var pt = limpo(origem.get(el));
      if (idioma === 'en') {
        if (DIC[pt] !== undefined && DIC[pt] !== pt) el.innerHTML = DIC[pt];
      } else {
        el.innerHTML = origem.get(el);
      }
    }
    /* segunda passada: nós de texto soltos (dentro de <a> com ícone, por exemplo)
       que a passada por unidade não alcança */
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var no2;
    while ((no2 = walker.nextNode())) {
      var pai = no2.parentElement;
      if (!pai || pai.tagName === 'SCRIPT' || pai.tagName === 'STYLE') continue;
      if (pai.closest('svg') || pai.closest('[data-i18n-skip]')) continue;
      if (!origem.has(no2)) origem.set(no2, no2.nodeValue);
      var bruto = origem.get(no2), chave = limpo(bruto);
      if (!chave) continue;
      if (idioma === 'en') {
        if (DIC[chave] !== undefined && DIC[chave] !== chave) {
          no2.nodeValue = bruto.replace(chave, DIC[chave]);
        }
      } else if (no2.nodeValue !== bruto) {
        no2.nodeValue = bruto;
      }
    }

    /* atributos */
    var comAttr = document.querySelectorAll('[alt],[aria-label],[data-desc],[title]');
    for (i = 0; i < comAttr.length; i++) {
      var no = comAttr[i];
      if (no.closest('[data-i18n-skip]')) continue;
      var guarda = origemAttr.get(no);
      if (!guarda) { guarda = {}; origemAttr.set(no, guarda); }
      for (j = 0; j < ATRIBUTOS.length; j++) {
        var a = ATRIBUTOS[j];
        if (!no.hasAttribute(a)) continue;
        if (guarda[a] === undefined) guarda[a] = no.getAttribute(a);
        var v = guarda[a];
        no.setAttribute(a, idioma === 'en' && DIC[v] !== undefined ? DIC[v] : v);
      }
    }
    /* título, descrição e cartões de compartilhamento */
    document.title = idioma === 'en' && DIC[tituloPT] ? DIC[tituloPT] : tituloPT;
    var metas = document.querySelectorAll(
      'meta[name="description"],meta[property="og:title"],meta[property="og:description"],' +
      'meta[name="twitter:title"],meta[name="twitter:description"]');
    for (i = 0; i < metas.length; i++) {
      var m = metas[i], id = m.getAttribute('name') || m.getAttribute('property');
      if (metasPT[id] === undefined) metasPT[id] = m.getAttribute('content') || '';
      var c = metasPT[id];
      m.setAttribute('content', idioma === 'en' && DIC[c] ? DIC[c] : c);
    }
    document.documentElement.lang = idioma === 'en' ? 'en' : 'pt-BR';
    var botoes = document.querySelectorAll('.idioma button');
    for (i = 0; i < botoes.length; i++) {
      botoes[i].setAttribute('aria-pressed', botoes[i].dataset.lang === idioma ? 'true' : 'false');
    }
    atual = idioma;
  }

  /* tradução sob demanda para textos que o JS monta (ex.: o aviso de e-mail copiado) */
  window.__t = function (pt) { return atual === 'en' && DIC[pt] ? DIC[pt] : pt; };
  window.__idioma = function () { return atual; };

  /* ---------- botão ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.idioma{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:999px;' +
    'background:rgba(119,136,152,.14);border:1px solid var(--line,#d5dadf);flex:none}' +
    '.idioma button{appearance:none;border:0;cursor:pointer;background:transparent;' +
    'font:inherit;font-weight:700;font-size:12px;line-height:1;letter-spacing:.04em;' +
    'padding:6px 10px;border-radius:999px;color:var(--body,#6a6e70);transition:background .15s,color .15s}' +
    '.idioma button:hover{color:var(--ink,#21262a)}' +
    '.idioma button[aria-pressed="true"]{background:var(--ink,#21262a);color:var(--on-dark,#f1f1f1)}' +
    '.idioma button:focus-visible{outline:2px solid var(--ink,#21262a);outline-offset:2px}' +
    /* o topo da home passa a acompanhar a rolagem, para o botão nunca sumir */
    '.topo{position:sticky;top:0;z-index:50;background:rgba(241,241,241,.9);' +
    '-webkit-backdrop-filter:saturate(180%) blur(12px);backdrop-filter:saturate(180%) blur(12px)}' +
    /* o botão entra como terceiro item da barra: o resto continua onde estava */
    '.topo__in,.topo__inner{justify-content:flex-start}' +
    '.topo__in > .topo__per,.topo__inner > .menu{margin-left:auto}' +
    /* no celular a barra do topo é estreita demais para caber mais um item:
       o botão vira uma pastilha flutuante, sempre à mão e sempre visível */
    '.idioma--flutua{position:fixed;right:14px;bottom:14px;z-index:70;' +
    'background:var(--page,#f1f1f1);border-color:var(--line-2,#a4afba);' +
    'box-shadow:0 6px 20px rgba(33,38,42,.18)}' +
    '.idioma--flutua button{padding:7px 11px;font-size:12px}';
  document.head.appendChild(css);

  var caixa = document.createElement('div');
  caixa.className = 'idioma';
  caixa.setAttribute('data-i18n-skip', '');
  caixa.setAttribute('role', 'group');
  caixa.setAttribute('aria-label', 'Idioma / Language');
  ['pt', 'en'].forEach(function (lg) {
    var b = document.createElement('button');
    b.type = 'button';
    b.dataset.lang = lg;
    b.textContent = lg.toUpperCase();
    b.title = lg === 'pt' ? 'Ver em português' : 'View in English';
    b.addEventListener('click', function () {
      try { localStorage.setItem(CHAVE, lg); } catch (e) {}
      aplicar(lg);
    });
    caixa.appendChild(b);
  });

  /* No desktop o botão mora na barra do topo. No celular a barra é estreita
     demais, então ele vira uma pastilha flutuante — e o backdrop-filter da barra
     criaria um contexto de posicionamento, por isso ele sai de lá de verdade. */
  var estreito = window.matchMedia('(max-width:767px)');
  function barraVisivel() {
    /* no arquivo único as quatro páginas convivem: pega a barra da que está à vista */
    return document.querySelector('.pg:not([hidden]) .topo__in, .pg:not([hidden]) .topo__inner')
        || document.querySelector('.topo__in, .topo__inner');
  }
  function posicionar() {
    var barra = barraVisivel();
    var flutua = estreito.matches || !barra;
    var destino = flutua ? document.body : barra;
    if (!flutua) barra.style.gap = barra.style.gap || '16px';
    if (caixa.parentNode !== destino) destino.appendChild(caixa);
    caixa.classList.toggle('idioma--flutua', flutua);
  }
  posicionar();
  if (estreito.addEventListener) estreito.addEventListener('change', posicionar);
  else if (estreito.addListener) estreito.addListener(posicionar);
  window.__i18n = { reposicionar: posicionar, aplicar: aplicar };

  aplicar(atual);
})();
