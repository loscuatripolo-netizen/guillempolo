/* Entrada de la portada: «Guillem Polo» y el titular aparecen en el centro y vuelan a su sitio.
   Solo en la portada, la primera visita de la sesión, con movimiento permitido y si la web ha llegado rápido.
   Después avisa a anim.js (evento gp-intro-fin) para que entre el resto del hero. */
(function () {
  var d = document, H = d.documentElement;
  function fin() { H.classList.remove('gp-pre'); window.__gpIntro = false; d.dispatchEvent(new Event('gp-intro-fin')); }
  if (!H.classList.contains('gp-pre')) return;
  var h1 = d.querySelector('.hero h1'), logo = d.querySelector('.barra .logo'), ceja = d.querySelector('.hero .eyebrow');
  if (!h1 || !logo || performance.now() > 1200||(navigator.connection&&(navigator.connection.saveData||/2g/.test(navigator.connection.effectiveType||'')))) { fin(); return; }
  window.__gpIntro = true;
  try { sessionStorage.setItem('gp-intro', '1'); } catch (e) {}

  var vw = innerWidth, vh = innerHeight, movil = vw < 700;
  var css = d.createElement('style'); css.textContent =
    '.gp-rejilla{position:absolute;inset:0;background-image:linear-gradient(rgba(16,64,47,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(16,64,47,.07) 1px,transparent 1px);background-size:48px 48px;background-position:center;-webkit-mask-image:radial-gradient(60% 55% at 50% 50%,#000 30%,transparent 100%);mask-image:radial-gradient(60% 55% at 50% 50%,#000 30%,transparent 100%)}' +
    '.gp-brillo{position:absolute;left:50%;top:50%;width:80vmax;height:80vmax;margin:-40vmax 0 0 -40vmax;border-radius:50%;background:radial-gradient(circle,rgba(28,107,77,.16) 0%,rgba(28,107,77,.06) 35%,transparent 62%)}' +
    '.gp-ventana{position:fixed;border-radius:18px;background:rgba(255,255,255,.62);border:1px solid rgba(16,64,47,.12);box-shadow:0 1px 0 rgba(255,255,255,.8) inset,0 40px 80px -40px rgba(16,40,30,.35),0 12px 30px -18px rgba(16,40,30,.25);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transform-origin:50% 50%}' +
    '.gp-barra{position:absolute;left:0;right:0;top:0;height:42px;display:flex;align-items:center;gap:7px;padding:0 16px;border-bottom:1px solid rgba(16,64,47,.08)}' +
    '.gp-barra i{width:10px;height:10px;border-radius:50%;background:rgba(16,64,47,.16)}' +
    '.gp-url{margin:0 auto;min-width:min(260px,46%);height:24px;border-radius:999px;background:rgba(16,64,47,.06);display:flex;align-items:center;justify-content:center;gap:6px;font:500 12.5px/1 "Instrument Sans",system-ui,sans-serif;color:#4C554F;letter-spacing:.01em}' +
    '.gp-url b{font-weight:600;color:#10402F}.gp-url u{text-decoration:none;display:inline-block;width:1px;height:13px;background:#10402F;animation:gp-cursor .9s steps(1) infinite}' +
    '.gp-esq{position:absolute;left:0;right:0;top:42px;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:0 12%;transition:opacity .2s}' +
    '.gp-esq i{display:block;height:14px;border-radius:7px;background:linear-gradient(90deg,rgba(16,64,47,.07) 0%,rgba(16,64,47,.14) 50%,rgba(16,64,47,.07) 100%);background-size:200% 100%;animation:gp-carga 1s linear infinite}' +
    '.gp-esq i.t{height:34px;border-radius:9px}' +
    '@keyframes gp-carga{to{background-position:-200% 0}}' +
    '@keyframes gp-cursor{50%{opacity:0}}.gp-ch{animation-duration:.55s!important}';
  d.head.appendChild(css);
  var curva = 'cubic-bezier(.16,1,.3,1)', vuelo = 'cubic-bezier(.83,0,.17,1)';
  var t = d.createElement('div'); t.className = 'gp-telon'; t.setAttribute('aria-hidden', 'true');
  var fondo = d.createElement('div'); fondo.className = 'gp-fondo';
  fondo.style.background = getComputedStyle(d.body).backgroundColor || '#F7F7F3';
  var au = d.querySelector('.aurora'); if (au) { var a2 = au.cloneNode(true); a2.style.position = 'absolute'; a2.style.zIndex = '0'; fondo.appendChild(a2); }
  var rej = d.createElement('div'); rej.className = 'gp-rejilla'; var bri = d.createElement('div'); bri.className = 'gp-brillo';
  fondo.appendChild(bri); fondo.appendChild(rej);
  t.appendChild(fondo); d.body.appendChild(t);
  H.classList.remove('gp-pre');

  /* copia una pieza con sus estilos calculados, para que fuera de su sitio sea idéntica */
  var P = ['color', 'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'word-spacing', 'line-height', 'text-transform', 'text-align',
    'white-space', 'background-color', 'background-image', 'display', 'overflow', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'border-radius', 'gap', 'align-items', 'justify-content', 'flex-direction', 'position', 'width', 'height', 'flex'];
  function copia(o, c, raiz) {
    var cs = getComputedStyle(o), st = c.style;
    P.forEach(function (k) {
      if (raiz && (k === 'width' || k === 'height' || k === 'position' || /^margin/.test(k))) return;
      if ((k === 'width' || k === 'height') && cs.display.indexOf('inline') === 0) return;
      st.setProperty(k, cs.getPropertyValue(k));
    });
    st.opacity = '1'; st.transform = 'none'; st.translate = 'none'; st.animation = 'none'; st.transition = 'none'; st.visibility = 'visible';
    for (var i = 0; i < o.children.length && i < c.children.length; i++) copia(o.children[i], c.children[i], false);
  }
  var piezas = [];
  function pieza(o, k, cx, cy) {
    var r = o.getBoundingClientRect(), c = o.cloneNode(true);
    copia(o, c, true);
    c.className += ' gp-pieza'; c.style.left = r.left + 'px'; c.style.top = r.top + 'px'; c.style.width = r.width + 'px'; c.style.height = r.height + 'px';
    var dx = cx - (r.left + r.width * k / 2), dy = cy - (r.top + r.height * k / 2);
    c.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + k + ')';
    t.appendChild(c); o.style.visibility = 'hidden';
    var p = { o: o, c: c, base: c.style.transform }; piezas.push(p); return p;
  }
  /* letras del titular, cada línea con su máscara */
  function letras(c) {
    var n = 0, w = d.createTreeWalker(c, NodeFilter.SHOW_TEXT, null), ns = [], x;
    while ((x = w.nextNode())) if (x.nodeValue.trim()) ns.push(x);
    ns.forEach(function (tn) {
      var f = d.createDocumentFragment();
      tn.nodeValue.split(/(\s+)/).forEach(function (pal) {
        if (!pal) return;
        if (/^\s+$/.test(pal)) { f.appendChild(d.createTextNode(pal)); return; }
        var pw = d.createElement('span'); pw.style.display = 'inline-block'; pw.style.whiteSpace = 'nowrap';
        pal.split('').forEach(function (ch) {
          var s = d.createElement('span'); s.className = 'gp-ch'; s.textContent = ch;
          s.style.animationDelay = (100 + n++ * 7) + 'ms'; pw.appendChild(s);
        });
        f.appendChild(pw);
      });
      tn.parentNode.replaceChild(f, tn);
    });
    return n;
  }

  var ventana = null, vr = null, L = null;
  /* medidas de la escena: ventana de navegador con el logo, la ceja y el titular dentro */
  function medir() {
    var rl = logo.getBoundingClientRect(), rh = h1.getBoundingClientRect(), rc = ceja && ceja.getBoundingClientRect();
    if (rc && (rc.width < 4 || rc.height < 4)) rc = null;
    var barra = 42, pad = movil ? 22 : 44;
    var kh = Math.min(movil ? .92 : 1, (vw * (movil ? .84 : .7) - 2 * pad) / rh.width, vh * .44 / rh.height);
    var kl = Math.min(movil ? 1.25 : 1.5, vw * .5 / rl.width), kc = 1, gap = movil ? 18 : 26;
    var alto = rl.height * kl + gap + (rc ? rc.height * kc + gap * .7 : 0) + rh.height * kh;
    var ancho = Math.max(rh.width * kh, rl.width * kl, rc ? rc.width * kc : 0) + 2 * pad;
    ancho = Math.min(vw - (movil ? 24 : 80), Math.max(ancho, movil ? vw - 24 : 560));
    var altoV = barra + pad + alto + pad;
    return { rl: rl, rh: rh, rc: rc, kh: kh, kl: kl, kc: kc, gap: gap, barra: barra, pad: pad,
      v: { left: (vw - ancho) / 2, top: Math.max(14, (vh - altoV) / 2), width: ancho, height: altoV } };
  }
  /* la ventana sale ya, sin esperar a las fuentes; luego se ajusta si hace falta */
  function abreVentana() {
    L = medir(); vr = L.v;
    ventana = d.createElement('div'); ventana.className = 'gp-ventana';
    ventana.style.cssText = 'left:' + vr.left + 'px;top:' + vr.top + 'px;width:' + vr.width + 'px;height:' + vr.height + 'px;transition:left .35s,top .35s,width .35s,height .35s';
    ventana.innerHTML = '<div class="gp-barra"><i></i><i></i><i></i><div class="gp-url"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1C6B4D" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><b class="gp-dom"></b><u></u></div></div><div class="gp-esq"><i style="width:22%"></i><i style="width:46%;height:8px"></i><i class="t" style="width:70%"></i><i class="t" style="width:58%"></i><i class="t" style="width:64%"></i></div>';
    t.insertBefore(ventana, fondo.nextSibling);
    ventana.animate([{ opacity: 0, transform: 'translateY(18px) scale(.965)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: curva, fill: 'backwards' });
    var dom = ventana.querySelector('.gp-dom'), txt = 'tunegocio.es', k = 0;
    (function escribe() { if (k <= txt.length) { dom.textContent = txt.slice(0, k++); setTimeout(escribe, 26); } })();
  }
  function monta() {
    L = medir(); var n0 = L.v;
    if (Math.abs(n0.width - vr.width) + Math.abs(n0.height - vr.height) > 2) { vr = n0; ventana.style.left = vr.left + 'px'; ventana.style.top = vr.top + 'px'; ventana.style.width = vr.width + 'px'; ventana.style.height = vr.height + 'px'; }
    var rl = L.rl, rh = L.rh, rc = L.rc, kh = L.kh, kl = L.kl, kc = L.kc, gap = L.gap;
    var esq = ventana.querySelector('.gp-esq'); if (esq) esq.style.opacity = '0';
    var y = vr.top + L.barra + L.pad;
    var pl = pieza(logo, kl, vw / 2, y + rl.height * kl / 2); y += rl.height * kl + gap;
    var pc = rc ? pieza(ceja, kc, vw / 2, y + rc.height * kc / 2) : null; if (rc) y += rc.height * kc + gap * .7;
    var ph = pieza(h1, kh, vw / 2, y + rh.height * kh / 2);
    var n = letras(ph.c);
    pl.c.animate([{ opacity: 0, transform: pl.base + ' translateY(12px)' }, { opacity: 1, transform: pl.base }], { duration: 600, delay: 80, easing: curva, fill: 'backwards' });
    var punto = pl.c.querySelector('.punto');
    if (punto) punto.animate([{ transform: 'scale(0)' }, { transform: 'scale(1.5)', offset: .6 }, { transform: 'scale(1)' }], { duration: 700, delay: 200, easing: curva, fill: 'backwards' });
    if (pc) pc.c.animate([{ opacity: 0, transform: pc.base + ' translateY(8px)' }, { opacity: 1, transform: pc.base }], { duration: 600, delay: 140, easing: curva, fill: 'backwards' });
    var dur = 100 + n * 7 + 550;
    setTimeout(salir, Math.max(dur + 40, movil ? 800 : 880));
  }

  var fuera = false;
  function salir() {
    if (fuera) return; fuera = true;
    fondo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, delay: 120, easing: 'ease', fill: 'forwards' });
    if (ventana) { var sx = vw / vr.width, sy = vh / vr.height, cx = vw / 2 - (vr.left + vr.width / 2), cy = vh / 2 - (vr.top + vr.height / 2);
      ventana.animate([{ transform: 'none', opacity: 1, offset: 0 }, { opacity: .35, offset: .3 }, { transform: 'translate(' + cx + 'px,' + cy + 'px) scale(' + sx + ',' + sy + ')', opacity: 0, offset: 1 }], { duration: 600, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' }); }
    piezas.forEach(function (p, i) {
      p.c.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} });
      var r = p.o.getBoundingClientRect();
      p.c.style.left = r.left + 'px'; p.c.style.top = r.top + 'px';
      p.c.animate([{ transform: p.base }, { transform: 'none' }], { duration: movil ? 620 : 680, delay: i * 35, easing: vuelo, fill: 'forwards' });
    });
    setTimeout(acaba, (movil ? 620 : 680) + piezas.length * 35 + 30);
  }
  function acaba() {
    piezas.forEach(function (p) { p.o.style.visibility = ''; });
    t.remove(); fin();
  }
  t.addEventListener('pointerdown', function () { if (piezas.length) salir(); });
  setTimeout(function () { if (d.body.contains(t)) { piezas.forEach(function (p) { p.o.style.visibility = ''; }); t.remove(); fin(); } }, 6000);
  try { abreVentana(); } catch (e) {}
  var fr = d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve();
  Promise.race([fr, new Promise(function (r) { setTimeout(r, movil ? 250 : 400); })]).then(function () { requestAnimationFrame(function () { try { monta(); } catch (e) { acaba(); } }); });
})();
