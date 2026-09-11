(function () {
  'use strict';
  /* Enquanto um asset não chegou em assets/, a moldura mostra o nome do arquivo
     que falta em vez de um ícone de imagem quebrada. */
  function placeholder(img) {
    var arq = decodeURIComponent((img.getAttribute('src') || '').split('/').pop());
    var d = document.createElement('div');
    d.className = 'ph';
    var f = document.createElement('span'); f.className = 'ph__f'; f.textContent = 'assets/' + arq;
    var t = document.createElement('p'); t.className = 'ph__d';
    t.textContent = img.getAttribute('data-desc') || img.getAttribute('alt') || '';
    d.appendChild(f); d.appendChild(t);
    if (img.parentNode) img.parentNode.replaceChild(d, img);
  }
  [].forEach.call(document.querySelectorAll('.shot img'), function (img) {
    img.addEventListener('error', function () { placeholder(img); });
    if (img.complete && img.naturalWidth === 0) placeholder(img);
  });
  var toastEl = document.getElementById('toast'), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.setAttribute('data-show', '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.removeAttribute('data-show'); }, 2400);
  }
  [].forEach.call(document.querySelectorAll('[data-email]'), function (btn) {
    var alvo = btn.querySelector('.btn__t'), original = alvo ? alvo.textContent : '', voltar;
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      var feito = function () {
        if (alvo) alvo.textContent = (window.__t ? window.__t('E-mail copiado') : 'E-mail copiado');
        toast((window.__t ? window.__t('E-mail copiado: ') : 'E-mail copiado: ') + email);
        clearTimeout(voltar);
        voltar = setTimeout(function () { if (alvo) alvo.textContent = original; }, 2400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(feito, feito);
      } else {
        var ta = document.createElement('textarea');
        ta.value = email; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); feito();
      }
    });
  });

  /* marca a seção visível no menu */
  var links = {};
  [].forEach.call(document.querySelectorAll('.menu a'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var alvos = [].slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window && alvos.length) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        var a = links[e.target.id];
        if (a) a.style.color = e.isIntersecting ? 'var(--ink)' : '';
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    alvos.forEach(function (s) { io.observe(s); });
  }
})();
