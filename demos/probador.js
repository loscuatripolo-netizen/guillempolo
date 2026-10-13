/* Probador de colores y diseños para bocetos (guillempolo.es/demos).
   Se añade al final de un boceto con <script src="probador.js"></script>.
   Cambia las variables de color del boceto y las fuentes/esquinas sin tocar el resto. */
(function () {
  if (window.__probador) return; window.__probador = 1;
  var doc = document.documentElement;
  var PALETAS = [
    { n: 'Original', c: null, m: ['#297F75', '#29537F', '#A1F7ED'] },
    { n: 'Rosa', c: { br: '#B84A75', br2: '#7E3A8C', m1: '#FAD3E2', m2: '#E5D4FA', m3: '#FFE0D6', m4: '#F6DDF3', m5: '#FBEAF1', suave: '#FDF2F6', fondo: '#FFFBFC' } },
    { n: 'Lavanda', c: { br: '#6152B0', br2: '#3E4E9C', m1: '#DCD6FA', m2: '#CFE0FB', m3: '#F7D9EE', m4: '#D8F3EC', m5: '#EEEBFC', suave: '#F5F3FE', fondo: '#FCFBFF' } },
    { n: 'Azul', c: { br: '#2B5DAA', br2: '#1E3E7A', m1: '#CFE2FB', m2: '#D3F1F4', m3: '#FFE7C2', m4: '#E3DCFA', m5: '#E8F1FD', suave: '#F2F7FE', fondo: '#FBFCFF' } },
    { n: 'Coral', c: { br: '#C2502B', br2: '#A33B3A', m1: '#FFD9C7', m2: '#FFE9B3', m3: '#D9F0E4', m4: '#F9D3DE', m5: '#FFF0E8', suave: '#FFF6F1', fondo: '#FFFCFA' } },
    { n: 'Verde', c: { br: '#3A7449', br2: '#2C5E6E', m1: '#D3EDC9', m2: '#CDE8EC', m3: '#F5EBC4', m4: '#F3D9D2', m5: '#EAF5E6', suave: '#F3FAF1', fondo: '#FCFDFB' } }
  ];
  var DISENOS = [
    { n: 'Original', d: 'Como está ahora', t: null, b: null, r: 1 },
    { n: 'Elegante', d: 'Letra con serifa, esquinas finas', t: 'Fraunces', b: 'Inter Tight', r: .35, g: 'Fraunces:opsz,wght@9..144,500;9..144,700' },
    { n: 'Moderno', d: 'Limpio y geométrico', t: 'Space Grotesk', b: 'DM Sans', r: .6, g: 'Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500;700' },
    { n: 'Divertido', d: 'Redondo y alegre', t: 'Fredoka', b: 'Nunito', r: 1.35, g: 'Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700' },
    { n: 'Clásico', d: 'Serio y de confianza', t: 'Playfair Display', b: 'Lato', r: .5, g: 'Playfair+Display:wght@600;700&family=Lato:wght@400;700' }
  ];
  var orig = {};
  ['br', 'br2', 'm1', 'm2', 'm3', 'm4', 'm5', 'suave', 'fondo'].forEach(function (k) { orig[k] = getComputedStyle(doc).getPropertyValue('--' + k).trim(); });
  if (orig.br) PALETAS[0].m = [orig.br, orig.br2 || orig.br, orig.m1 || orig.suave];

  var css = document.createElement('style');
  css.textContent =
    '#pb-btn{position:fixed;left:14px;bottom:14px;z-index:2147483000;display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:11px 16px 11px 12px;background:#fff;color:#14181f;font:600 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);cursor:pointer}' +
    '#pb-btn i{width:22px;height:22px;border-radius:50%;background:conic-gradient(var(--br,#297F75) 0 33%,var(--br2,#29537F) 0 66%,var(--m1,#A1F7ED) 0);flex:none}' +
    '#pb-pan{position:fixed;left:14px;bottom:70px;z-index:2147483001;width:min(330px,calc(100vw - 28px));max-height:calc(100vh - 100px);overflow:auto;background:#fff;color:#14181f;border-radius:20px;padding:16px;box-shadow:0 18px 50px rgba(0,0,0,.22),0 0 0 1px rgba(0,0,0,.06);font:400 14px/1.35 system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '#pb-pan[hidden]{display:none}#pb-pan h4{margin:0 0 4px;font:700 15px/1.2 system-ui,sans-serif}#pb-pan p.pb-sub{margin:0 0 12px;color:#69707d;font-size:12.5px}' +
    '#pb-pan .pb-t{margin:14px 0 8px;font:700 11.5px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#69707d}' +
    '.pb-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.pb-col{border:2px solid #e6e7eb;background:#fff;border-radius:14px;padding:8px 6px 7px;cursor:pointer;font:600 12px/1.2 system-ui,sans-serif;color:#14181f}' +
    '.pb-col span{display:flex;justify-content:center;margin-bottom:6px}.pb-col b{width:18px;height:18px;border-radius:50%;margin:0 -3px;border:2px solid #fff;display:block}' +
    '.pb-dis{display:grid;gap:7px}.pb-d{display:flex;flex-direction:column;align-items:flex-start;text-align:left;border:2px solid #e6e7eb;background:#fff;border-radius:14px;padding:9px 12px;cursor:pointer;color:#14181f}' +
    '.pb-d b{font-size:16px;line-height:1.2}.pb-d small{color:#69707d;font:400 12px/1.3 system-ui,sans-serif;margin-top:2px}' +
    '.pb-col[aria-pressed=true],.pb-d[aria-pressed=true]{border-color:#14181f;box-shadow:0 0 0 1px #14181f}' +
    '.pb-pie{display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:8px}.pb-pie button{border:0;background:none;color:#69707d;font:600 12.5px/1 system-ui,sans-serif;text-decoration:underline;cursor:pointer;padding:6px 0}' +
    '.pb-pie .pb-ok{background:#14181f;color:#fff;text-decoration:none;border-radius:999px;padding:10px 16px}' +
    ':root[data-pb-pal] [id^="ia-asistente"],:root[data-pb-pal] #ia-asistente{--ia-color:var(--br)!important}' +
    ':root[data-pb-pal] [id^="pr-firma"] .pt-h{color:var(--br)!important;background:linear-gradient(90deg,var(--br),var(--br2))!important;-webkit-background-clip:text!important;background-clip:text!important}' +
    ':root[data-pb-pal] .pr-pista{color:var(--br)!important}:root[data-pb-pal] .pr-demo-ia{background:var(--br)!important}';
  document.head.appendChild(css);

  function fuente(g) {
    if (!g || document.querySelector('link[data-pb="' + g + '"]')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.dataset.pb = g;
    l.href = 'https://fonts.googleapis.com/css2?family=' + g + '&display=swap'; document.head.appendChild(l);
  }
  var memo = null;
  function recoger() {
    if (memo) return memo; memo = [];
    var els = document.body.querySelectorAll('*');
    for (var i = 0; i < els.length; i++) {
      var e = els[i]; if (e.closest('#pb-pan,#pb-btn') || /^(SCRIPT|STYLE|svg|path|CANVAS)$/i.test(e.tagName)) continue;
      var cs = getComputedStyle(e), f = cs.fontFamily, r = parseFloat(cs.borderTopLeftRadius) || 0;
      var rol = /Familjen/i.test(f) ? 't' : /Inter Tight/i.test(f) ? 'b' : '';
      if (rol || (r >= 6 && r < 90)) memo.push({ e: e, rol: rol, f: e.style.fontFamily, r: r, rs: e.style.borderRadius });
    }
    return memo;
  }
  function paleta(i) {
    var p = PALETAS[i];
    for (var k in orig) doc.style.setProperty('--' + k, p.c ? p.c[k] : orig[k]);
    if (p.c) doc.setAttribute('data-pb-pal', i); else { doc.removeAttribute('data-pb-pal'); for (var k2 in orig) doc.style.removeProperty('--' + k2); }
    marcar('.pb-col', i);
  }
  function diseno(i) {
    var d = DISENOS[i]; fuente(d.g); var L = recoger();
    L.forEach(function (x) {
      if (x.rol) x.e.style.fontFamily = d.t ? '"' + (x.rol === 't' ? d.t : d.b) + '",system-ui,sans-serif' : x.f;
      if (x.r >= 6 && x.r < 90) x.e.style.borderRadius = d.r === 1 ? x.rs : Math.round(x.r * d.r) + 'px';
    });
    marcar('.pb-d', i);
  }
  function marcar(sel, i) { var b = pan.querySelectorAll(sel); for (var j = 0; j < b.length; j++) b[j].setAttribute('aria-pressed', j === i ? 'true' : 'false'); }

  var btn = document.createElement('button'); btn.id = 'pb-btn'; btn.type = 'button'; btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<i></i>Probar colores y diseños';
  var pan = document.createElement('div'); pan.id = 'pb-pan'; pan.hidden = true; pan.setAttribute('role', 'dialog'); pan.setAttribute('aria-label', 'Probar colores y diseños');
  var h = '<h4>Prueba cómo quedaría</h4><p class="pb-sub">Toca un color y un estilo: la web cambia al momento. Luego me dices cuál te gusta.</p><div class="pb-t">Colores</div><div class="pb-cols">';
  PALETAS.forEach(function (p, i) { var m = p.c ? [p.c.br, p.c.br2, p.c.m1] : p.m; h += '<button type="button" class="pb-col" data-i="' + i + '"><span><b style="background:' + m[0] + '"></b><b style="background:' + m[1] + '"></b><b style="background:' + m[2] + '"></b></span>' + p.n + '</button>'; });
  h += '</div><div class="pb-t">Estilo</div><div class="pb-dis">';
  DISENOS.forEach(function (d, i) { h += '<button type="button" class="pb-d" data-i="' + i + '"><b' + (d.t ? ' style="font-family:\'' + d.t + '\',serif"' : '') + '>' + d.n + '</b><small>' + d.d + '</small></button>'; });
  h += '</div><div class="pb-pie"><button type="button" class="pb-reset">Volver al original</button><button type="button" class="pb-ok">Listo</button></div>';
  pan.innerHTML = h;
  DISENOS.forEach(function (d) { fuente(d.g); });
  pan.addEventListener('click', function (ev) {
    var c = ev.target.closest('.pb-col'), d = ev.target.closest('.pb-d');
    if (c) paleta(+c.dataset.i); else if (d) diseno(+d.dataset.i);
    else if (ev.target.closest('.pb-reset')) { paleta(0); diseno(0); }
    else if (ev.target.closest('.pb-ok')) abrir(false);
  });
  function abrir(v) { pan.hidden = !v; btn.setAttribute('aria-expanded', v ? 'true' : 'false'); }
  btn.addEventListener('click', function () { abrir(pan.hidden); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrir(false); });
  function montar() {
    document.body.appendChild(pan); document.body.appendChild(btn);
    marcar('.pb-col', 0); marcar('.pb-d', 0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
