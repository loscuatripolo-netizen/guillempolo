(function(){
  /* barra de saltos: marca la sección en la que estás */
  var sl = [].slice.call(document.querySelectorAll('.saltos a'));
  if(sl.length && 'IntersectionObserver' in window){
    var mapa = {}; sl.forEach(function(a){ mapa[a.getAttribute('href').slice(1)] = a; });
    var io2 = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){
      sl.forEach(function(a){ a.removeAttribute('aria-current'); });
      var a = mapa[e.target.id]; a.setAttribute('aria-current','true');
      var c = a.parentNode; c.scrollTo({left: a.offsetLeft - c.clientWidth/2 + a.clientWidth/2, behavior:'smooth'});
    }}); }, {rootMargin:'-45% 0px -50% 0px'});
    Object.keys(mapa).forEach(function(id){ var n=document.getElementById(id); if(n) io2.observe(n); });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce) document.documentElement.classList.add('anim');

  var barra = document.getElementById('barra');
  if(barra){
    var alScroll = function(){ barra.classList.toggle('pegada', window.scrollY > 12); };
    alScroll(); window.addEventListener('scroll', alScroll, {passive:true});
  }

  var revs = [].slice.call(document.querySelectorAll('.rev'));
  if(!reduce && 'IntersectionObserver' in window && !document.documentElement.classList.contains('gsap')){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('dentro'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -12% 0px', threshold:.1});
    revs.forEach(function(el){ io.observe(el); });
  } else if(!document.documentElement.classList.contains('gsap')) {
    revs.forEach(function(el){ el.classList.add('dentro'); });
  }

  /* pestañas de ejemplo */
  var grupos = {};
  [].slice.call(document.querySelectorAll('.gal-b')).forEach(function(b){
    var cont = b.parentNode;
    (grupos[cont.id || cont.getAttribute('aria-label') || 'x'] = grupos[cont.id || cont.getAttribute('aria-label') || 'x'] || []).push(b);
  });
  Object.keys(grupos).forEach(function(k){
    var bs = grupos[k];
    function abrir(t){
      bs.forEach(function(b){
        var sel = b === t;
        b.setAttribute('aria-selected', String(sel));
        var pn = document.getElementById(b.getAttribute('aria-controls'));
        if(pn) pn.hidden = !sel;
      });
    }
    bs.forEach(function(b){
      b.addEventListener('click', function(){ abrir(b); });
      b.addEventListener('keydown', function(ev){
        var i = bs.indexOf(b), n = null;
        if(ev.key === 'ArrowRight') n = bs[(i+1) % bs.length];
        if(ev.key === 'ArrowLeft') n = bs[(i-1+bs.length) % bs.length];
        if(n){ ev.preventDefault(); n.focus(); abrir(n); }
      });
    });
  });

  /* solo una pregunta abierta */
  document.querySelectorAll('.faq details').forEach(function(d){
    d.addEventListener('toggle', function(){
      if(!d.open) return;
      document.querySelectorAll('.faq details[open]').forEach(function(o){ if(o !== d) o.open = false; });
    });
  });

  /* foco que sigue al ratón */
  document.querySelectorAll('.btn,.plan,.q').forEach(function(el){
    el.addEventListener('pointermove', function(ev){
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((ev.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my', ((ev.clientY-r.top)/r.height*100)+'%');
    });
  });

  /* botón de llamar en móvil */
  var llamar = document.getElementById('llamar');
  if(llamar){
    var ver = function(){ llamar.classList.toggle('dentro', window.scrollY > 520); };
    ver(); window.addEventListener('scroll', ver, {passive:true});
  }
})();