/* ===========================================================================
   Medição do portfólio — GA4 (G-TM34J12CLE) com consentimento.

   O gtag é carregado no <head> de cada página com o Consent Mode v2 em
   "denied". Enquanto ninguém aceita, o Google recebe apenas ping sem cookie;
   nada é gravado no navegador. Ao aceitar, este arquivo libera o
   analytics_storage e a escolha fica guardada em localStorage.

   Pageview sozinho não diz nada num portfólio. O que interessa está aqui:
   qual case a pessoa abriu, até onde ela leu, e se clicou em contato.
   =========================================================================== */
(function () {
  'use strict';

  var CHAVE = 'et_consentimento';

  function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }

  /* --- qual página é esta ------------------------------------------------ */
  var CASES = {
    'nega-nago': 'Nega Nagô',
    'ct-em-campo': 'CT em Campo',
    'canaltech-hub': 'Canaltech · Hub de links',
    'thumbdrop': 'ThumbDrop'
  };
  var arquivo = (location.pathname.split('/').pop() || 'index.html')
    .replace(/\.html?$/i, '') || 'index';
  var nomeCase = CASES[arquivo] || null;

  function idioma() {
    if (typeof window.__idioma === 'function') return window.__idioma();
    return (document.documentElement.lang || 'pt').slice(0, 2);
  }
  function ev(nome, params) {
    params = params || {};
    params.idioma = idioma();
    if (nomeCase) params.case_nome = nomeCase;
    gtag('event', nome, params);
  }

  /* --- consentimento ----------------------------------------------------- */
  function lido() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function grava(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  var TXT = {
    pt: {
      t: 'Este site usa um cookie de medição para eu saber quais projetos são abertos. Nada é vendido nem compartilhado.',
      a: 'Aceitar', r: 'Recusar'
    },
    en: {
      t: 'This site uses one measurement cookie so I can see which projects get opened. Nothing is sold or shared.',
      a: 'Accept', r: 'Decline'
    }
  };

  function barra() {
    if (lido()) return;

    var css = document.createElement('style');
    css.textContent =
      '.ck{position:fixed;left:0;right:0;bottom:0;z-index:80;display:flex;gap:16px;' +
      'align-items:center;justify-content:center;flex-wrap:wrap;' +
      'padding:14px 20px;background:var(--ink,#21262a);color:var(--on-dark,#f1f1f1);' +
      'font:400 13px/1.5 Sora,system-ui,sans-serif;' +
      'box-shadow:0 -6px 24px rgba(33,38,42,.18)}' +
      '.ck__t{max-width:720px;margin:0;color:var(--on-dark-2,#d5dadf)}' +
      '.ck__acoes{display:flex;gap:8px;flex:0 0 auto}' +
      '.ck button{font:600 13px/1 Sora,system-ui,sans-serif;padding:10px 18px;' +
      'border-radius:999px;border:1px solid transparent;cursor:pointer}' +
      '.ck__ok{background:var(--on-dark,#f1f1f1);color:var(--ink,#21262a)}' +
      '.ck__nao{background:transparent;color:var(--on-dark,#f1f1f1);' +
      'border-color:var(--muted,#778898)}' +
      '.ck button:hover{opacity:.88}' +
      '.ck button:focus-visible{outline:2px solid var(--on-dark,#f1f1f1);outline-offset:2px}' +
      'html[data-ck] .idioma--flutua{bottom:104px}' +
      '@media (max-width:720px){.ck{gap:12px;padding:14px 16px}.ck__t{font-size:12px}}';
    document.head.appendChild(css);

    var el = document.createElement('div');
    el.className = 'ck';
    el.setAttribute('role', 'region');
    el.setAttribute('data-i18n-skip', '');

    var p = document.createElement('p');
    p.className = 'ck__t';
    var acoes = document.createElement('div');
    acoes.className = 'ck__acoes';
    var ok = document.createElement('button');
    ok.type = 'button'; ok.className = 'ck__ok';
    var nao = document.createElement('button');
    nao.type = 'button'; nao.className = 'ck__nao';

    function escrever() {
      var t = TXT[idioma() === 'en' ? 'en' : 'pt'];
      p.textContent = t.t; ok.textContent = t.a; nao.textContent = t.r;
      el.setAttribute('aria-label', t.a + ' / ' + t.r);
    }
    escrever();

    function fechar(escolha) {
      grava(escolha);
      if (escolha === 'aceito') gtag('consent', 'update', { analytics_storage: 'granted' });
      ev('consentimento', { escolha: escolha });
      if (el.parentNode) el.parentNode.removeChild(el);
      document.documentElement.removeAttribute('data-ck');
      if (window.__i18n && window.__i18n.reposicionar) window.__i18n.reposicionar();
    }
    ok.addEventListener('click', function () { fechar('aceito'); });
    nao.addEventListener('click', function () { fechar('recusado'); });

    /* o seletor de idioma do site troca o texto da barra junto */
    document.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-lang]') : null;
      if (b) setTimeout(escrever, 0);
    });

    acoes.appendChild(ok); acoes.appendChild(nao);
    el.appendChild(p); el.appendChild(acoes);
    document.body.appendChild(el);
    document.documentElement.setAttribute('data-ck', '');
    if (window.__i18n && window.__i18n.reposicionar) window.__i18n.reposicionar();
  }

  /* --- eventos ----------------------------------------------------------- */
  function eventos() {
    /* abriu um case */
    if (nomeCase) ev('ver_case');

    /* clique num card de projeto na home */
    [].forEach.call(document.querySelectorAll('a.proj[href]'), function (a, i) {
      a.addEventListener('click', function () {
        var alvo = (a.getAttribute('href') || '').replace(/\.html?$/i, '');
        ev('abrir_case', { case_destino: CASES[alvo] || alvo, posicao: i + 1 });
      });
    });

    /* contato — os três caminhos que importam */
    function contato(sel, acao) {
      [].forEach.call(document.querySelectorAll(sel), function (n) {
        n.addEventListener('click', function () { ev('contato', { acao: acao }); });
      });
    }
    contato('[data-email]', 'copiar_email');
    contato('a[href*="linkedin.com"]', 'linkedin');
    contato('a[href*="drive.google.com"]', 'curriculo');

    /* troca de idioma */
    [].forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
      b.addEventListener('click', function () {
        ev('idioma', { para: b.dataset.lang });
      });
    });

    /* profundidade de leitura — só nas páginas de case */
    if (!nomeCase) return;
    var marcas = [25, 50, 75, 100], vistas = {}, pendente = false;
    function medir() {
      pendente = false;
      var doc = document.documentElement;
      var rolavel = doc.scrollHeight - window.innerHeight;
      if (rolavel <= 0) return;
      var pct = ((window.pageYOffset || doc.scrollTop) / rolavel) * 100;
      for (var i = 0; i < marcas.length; i++) {
        var m = marcas[i];
        /* o fim da página raramente fecha em 100 exatos: zoom, barra do
           navegador no celular e pixel fracionado deixam sobrar um resto. */
        var limite = m === 100 ? 98 : m;
        if (pct >= limite && !vistas[m]) { vistas[m] = 1; ev('leitura_case', { marca: m }); }
      }
    }
    window.addEventListener('scroll', function () {
      if (pendente) return;
      pendente = true;
      (window.requestAnimationFrame || setTimeout)(medir, 150);
    }, { passive: true });
    medir();
  }

  function iniciar() { barra(); eventos(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
