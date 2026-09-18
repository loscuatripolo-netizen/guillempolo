/* Capa de movimiento con GSAP (alojado en el propio dominio).
   Si GSAP no carga o el usuario pide menos movimiento, la web funciona
   igual con las animaciones CSS de siempre. */
(function(){
  var raiz = document.documentElement;
  if(!window.gsap || !raiz.classList.contains('gsap')) return;
  var g = window.gsap, ST = window.ScrollTrigger, Split = window.SplitText;
  if(ST) g.registerPlugin(ST);
  if(Split) g.registerPlugin(Split);

  function listo(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  listo(function(){

    /* ---------- 1. portada: titular letra a letra ---------- */
    var h1 = document.querySelector('.hero h1');
    var tl = g.timeline({defaults:{ease:'power4.out'}});

    if(h1){
      var lineas = h1.querySelectorAll('.l > span');
      var chars = null;
      if(Split && lineas.length){
        try{
          var sp = new Split(lineas, {type:'chars', charsClass:'ch'});
          chars = sp.chars;
        }catch(e){ chars = null; }
      }
      if(chars && chars.length){
        tl.from(chars, {yPercent:120, opacity:0, rotate:3, duration:1.1, stagger:0.014,
                        onComplete:function(){ try{ sp.revert(); }catch(e){} }}, 0);
      } else if(lineas.length){
        tl.from(lineas, {yPercent:110, duration:.95, stagger:.1}, 0);
      }
    }

    tl.from('.hero .eyebrow', {y:14, opacity:0, duration:.7}, .05)
      .to('.hero-sub',   {opacity:1, duration:.8}, .4)
      .from('.hero-sub', {y:20, duration:.9}, .4)
      .to('.hero-cta',   {opacity:1, duration:.6}, .55)
      .from('.hero-cta > *', {y:18, opacity:0, duration:.8, stagger:.09}, .55)
      .to('.cuatro',     {opacity:1, duration:.6}, .7)
      .from('.cuatro > *', {y:30, opacity:0, duration:.85, stagger:.07}, .7);

    if(!ST) return;

    /* ---------- 2. entradas al hacer scroll, en cascada ---------- */
    var revs = g.utils.toArray('.rev');
    if(revs.length){
      g.set(revs, {opacity:0, y:28});
      ST.batch(revs, {
        start: 'top 88%',
        once: true,
        onEnter: function(lote){
          lote.forEach(function(el){ el.classList.add('dentro'); });
          g.to(lote, {opacity:1, y:0, duration:.9, ease:'power3.out', stagger:.08, overwrite:true});
        }
      });
    }

    /* ---------- 3. titulares de sección, línea a línea ---------- */
    if(Split){
      g.utils.toArray('h2').forEach(function(h2){
        if(h2.closest('.hero')) return;
        if(!h2.textContent.trim()) return;
        var s;
        try{ s = new Split(h2, {type:'lines', linesClass:'ln'}); }catch(e){ return; }
        if(!s.lines.length){ return; }
        g.from(s.lines, {yPercent:108, duration:1, ease:'power4.out', stagger:.09,
          scrollTrigger:{trigger:h2, start:'top 88%', once:true},
          onComplete:function(){ try{ s.revert(); }catch(e){} }});
      });
    }

    /* ---------- 4. barra de progreso de lectura ---------- */
    var barra = document.getElementById('barra') || document.querySelector('.barra');
    if(barra && !barra.querySelector('.progreso')){
      var pr = document.createElement('span');
      pr.className = 'progreso';
      barra.appendChild(pr);
      g.to(pr, {scaleX:1, ease:'none',
        scrollTrigger:{trigger:document.body, start:'top top', end:'bottom bottom', scrub:.3}});
    }

    /* ---------- 5. el fondo se mueve a otra velocidad ---------- */
    var blobs = document.querySelectorAll('.aurora i');
    if(blobs.length){
      var vel = [[-12, 0, 1.2], [18, -4, 1.8], [-26, 5, 2.6]];
      [].forEach.call(blobs, function(b, i){
        var v = vel[i] || vel[0];
        g.to(b, {yPercent:v[0], xPercent:v[1], ease:'none',
          scrollTrigger:{trigger:document.body, start:'top top', end:'bottom bottom', scrub:v[2]}});
      });
    }

    /* ---------- 6. la portada se despide ---------- */
    var hero = document.querySelector('.hero .marco');
    if(hero){
      g.to(hero, {y:54, opacity:.32, ease:'none',
        scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:.5}});
    }

    /* ---------- 7. el comparador se abre con el scroll ---------- */
    var comp = document.getElementById('comp');
    if(comp){
      var e = {v:80};
      g.to(e, {v:28, ease:'none',
        scrollTrigger:{trigger:comp, start:'top 82%', end:'bottom 62%', scrub:.7},
        onUpdate:function(){
          if(comp.dataset.tocado) return;
          comp.style.setProperty('--corte', e.v.toFixed(1)+'%');
          comp.setAttribute('aria-valuenow', Math.round(e.v));
        }});
      ['pointerdown','keydown'].forEach(function(ev){
        comp.addEventListener(ev, function(){ comp.dataset.tocado = '1'; });
      });
    }

    /* ---------- 8. botones magnéticos ---------- */
    if(window.matchMedia('(pointer:fine)').matches){
      g.utils.toArray('.btn').forEach(function(b){
        var x = g.quickTo(b, 'x', {duration:.45, ease:'power3'});
        var y = g.quickTo(b, 'y', {duration:.45, ease:'power3'});
        b.addEventListener('pointermove', function(ev){
          var r = b.getBoundingClientRect();
          x((ev.clientX - r.left - r.width/2) * .26);
          y((ev.clientY - r.top - r.height/2) * .34);
        });
        b.addEventListener('pointerleave', function(){ x(0); y(0); });
      });
    }


    /* ---------- 10. las tarjetas siguen al cursor ---------- */
    if(window.matchMedia('(pointer:fine)').matches){
      g.utils.toArray('.plan, .gar, .q, .gal-caja, .qi').forEach(function(c){
        c.addEventListener('pointermove', function(ev){
          var r = c.getBoundingClientRect();
          c.style.setProperty('--mx', ((ev.clientX-r.left)/r.width*100).toFixed(1)+'%');
          c.style.setProperty('--my', ((ev.clientY-r.top)/r.height*100).toFixed(1)+'%');
        });
      });
    }

    /* ---------- 11. la cinta cambia de sentido segun el scroll ---------- */
    var pista = document.querySelector('.cinta-pista');
    if(pista){
      var ultimo = 0;
      ST.create({trigger:document.body, start:'top top', end:'bottom bottom',
        onUpdate:function(self){
          var d = self.direction;
          if(d !== ultimo){ ultimo = d; pista.style.animationDirection = d === 1 ? 'normal' : 'reverse'; }
        }});
    }

    window.addEventListener('load', function(){ ST.refresh(); });
  });
})();
