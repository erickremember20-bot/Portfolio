/* Zoom das imagens dos cases.
   Clique em qualquer imagem dentro de .shot para abrir em tela cheia.
   Autossuficiente: injeta o próprio CSS e a própria marcação, como o i18n.js. */
(function () {
  'use strict';

  function t(pt) { return (window.__t ? window.__t(pt) : pt); }

  var CSS = [
    '.lupa{position:fixed;inset:0;z-index:9000;display:none;',
    'background:rgba(33,38,42,.94);padding:32px;',
    'align-items:center;justify-content:center;opacity:0;transition:opacity .18s}',
    '.lupa[open],.lupa.aberta{display:flex}',
    '.lupa.vista{opacity:1}',
    '.lupa__fig{margin:0;display:flex;flex-direction:column;gap:14px;',
    'align-items:center;max-width:100%;max-height:100%}',
    '.lupa__img{max-width:100%;max-height:calc(100vh - 132px);width:auto;height:auto;',
    'object-fit:contain;border-radius:10px;background:#e9e9ea;display:block}',
    '.lupa__cap{margin:0;font-size:13px;line-height:1.5;color:#d5dadf;text-align:center;max-width:820px}',
    '.lupa__x{position:fixed;top:20px;right:20px;z-index:1;',
    'width:44px;height:44px;border-radius:999px;border:1px solid rgba(241,241,241,.35);',
    'background:rgba(241,241,241,.08);color:#f1f1f1;font:inherit;font-size:20px;line-height:1;',
    'cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .18s}',
    '.lupa__x:hover{background:rgba(241,241,241,.2)}',
    '@media (max-width:768px){.lupa{padding:16px}',
    '.lupa__img{max-height:calc(100vh - 110px)}',
    '.lupa__x{top:12px;right:12px;width:38px;height:38px;font-size:18px}}',
    '@media (prefers-reduced-motion:reduce){.lupa{transition:none}}'
  ].join('');

  var caixa, figura, grande, legenda, fechar, ultimo = null;

  function montar() {
    var s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);

    caixa = document.createElement('div');
    caixa.className = 'lupa';
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    caixa.setAttribute('data-i18n-skip', '');

    fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.className = 'lupa__x';
    fechar.innerHTML = '&times;';

    figura = document.createElement('figure');
    figura.className = 'lupa__fig';
    grande = document.createElement('img');
    grande.className = 'lupa__img';
    // pixel transparente: um <img> sem src conta como imagem quebrada nas varreduras
    grande.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    legenda = document.createElement('figcaption');
    legenda.className = 'lupa__cap';
    figura.appendChild(grande);
    figura.appendChild(legenda);

    caixa.appendChild(fechar);
    caixa.appendChild(figura);
    document.body.appendChild(caixa);

    caixa.addEventListener('click', function (e) {
      if (e.target === caixa || e.target === figura || e.target === fechar) sair();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && caixa.classList.contains('aberta')) sair();
    });
  }

  function rotular() {
    caixa.setAttribute('aria-label', t('Imagem ampliada'));
    fechar.setAttribute('aria-label', t('Fechar'));
    fechar.setAttribute('title', t('Fechar'));
  }

  function abrir(img) {
    ultimo = img;
    grande.src = img.currentSrc || img.src;
    grande.alt = img.alt || '';
    var d = img.getAttribute('data-desc') || img.alt || '';
    legenda.textContent = d;
    legenda.hidden = !d;
    rotular();
    caixa.classList.add('aberta');
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(function () { caixa.classList.add('vista'); });
    fechar.focus();
  }

  function sair() {
    caixa.classList.remove('vista');
    caixa.classList.remove('aberta');
    document.documentElement.style.overflow = '';
    if (ultimo) { try { ultimo.focus(); } catch (e) {} }
  }

  function ligar() {
    var imgs = document.querySelectorAll('.shot img');
    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        if (img.getAttribute('data-zoom') === 'nao') return;
        // no arquivo único as quatro páginas convivem: o zoom é só dos cases
        if (img.closest && img.closest('.pg[data-p="home"]')) return;
        img.style.cursor = 'zoom-in';
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.addEventListener('click', function () { abrir(img); });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(img); }
        });
      })(imgs[i]);
    }
  }

  function iniciar() { montar(); rotular(); ligar(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
