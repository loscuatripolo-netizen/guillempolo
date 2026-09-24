#!/usr/bin/env python3
"""Genera la demo de agente de reseñas para un negocio.
Uso: python3 gen_resenas.py config.json [--og]
La plantilla puede ser plantilla-resenas.html (con __YS__/__DMS__) o cualquier demo ya publicada:
se sustituyen los data-t, las meta y el bloque <script id="datos">.
"""
import json, re, sys, base64, os, html, urllib.parse, subprocess
AQUI = os.path.dirname(os.path.abspath(__file__))
cfg = json.load(open(sys.argv[1], encoding='utf-8'))
plant = cfg.get('plantilla', os.path.join(AQUI, 'plantilla-resenas.html'))
t = open(plant, encoding='utf-8').read()
slug = cfg['slug']; neg = cfg['negocio']
URL = 'https://guillempolo.vercel.app/demos/' + slug

def meta(prop, val, attr='property'):
    global t
    t = re.sub(r'(<meta %s="%s" content=")[^"]*(")' % (attr, re.escape(prop)), lambda m: m.group(1) + html.escape(val, quote=True) + m.group(2), t)
t = re.sub(r'<title>.*?</title>', '<title>%s · Vuestras reseñas, contestadas</title>' % html.escape(neg), t, count=1)
meta('description', 'Propuesta para %s: un agente que contesta las reseñas de Google en vuestro tono y os pasa primero las delicadas.' % neg, 'name')
meta('og:title', '%s · Vuestras reseñas, contestadas' % neg)
meta('og:description', cfg.get('og_desc', 'Diez reseñas vuestras de verdad con su respuesta. Las delicadas os llegan antes de publicarse.'))
meta('og:image', URL + '-og.jpg')
meta('og:url', URL)

reales = sum(1 for r in cfg['resenas'] if not r.get('inventada'))
inv = len(cfg['resenas']) - reales
num = ['cero','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez']
N = lambda n: num[n] if n < len(num) else str(n)
txt = {
  'negocio': neg,
  'para': cfg.get('para', 'Para el equipo de ' + neg),
  'nota': cfg['nota'], 'total': cfg['total'],
  'cifra3': cfg.get('cifra3', '0'), 'cifra3txt': cfg.get('cifra3txt', 'respuestas en las que Google enseña primero'),
  'iniciales': cfg.get('iniciales', ''.join(w[0] for w in neg.split()[:2]).upper()),
  'movil_queja': cfg['movil_queja'], 'movil_resp': cfg['movil_resp'], 'movil_cambio': cfg.get('movil_cambio', 'OK, publícala'),
  'intro_demo': cfg.get('intro_demo', '%s son reseñas vuestras de verdad, sacadas de Google.%s Probad a publicar o editar las que esperan.' % (
      N(reales).capitalize(), (' La décima es un ejemplo negativo inventado, para que veáis qué pasa cuando llega una mala.' if inv == 1 else (' %s son ejemplos inventados.' % N(inv).capitalize() if inv else '')))),
  'regla_platos': cfg['regla_platos'],
  'precio_alta': cfg.get('precio_alta', 'desde 390 €'), 'precio_mes': cfg.get('precio_mes', 'desde 39 €'),
  'firma_corta': cfg.get('firma_corta', 'El equipo de ' + neg),
}
for k, v in txt.items():
    pat = re.compile(r'(<(\w+)\b[^>]*\bdata-t="%s"[^>]*>)(.*?)(</\2>)' % k, re.S)
    t, n = pat.subn(lambda m: m.group(1) + html.escape(v, quote=False) + m.group(4), t)
    if not n: print('AVISO: no encuentro data-t=%s' % k)
datos = {'firma': cfg.get('firma', 'El equipo de ' + neg), 'resenas': cfg['resenas']}
js = json.dumps(datos, ensure_ascii=False).replace('</', '<\\/')
t = re.sub(r'(<script type="application/json" id="datos">).*?(</script>)', lambda m: m.group(1) + js + m.group(2), t, count=1, flags=re.S)
wa = 'Hola Guillem, he visto lo de las reseñas de ' + neg
t = re.sub(r'href="https://wa\.me/34688655465\?text=[^"]*" data-wa', 'href="https://wa.me/34688655465?text=%s" data-wa' % urllib.parse.quote(wa), t)
for var, val in cfg.get('colores', {}).items():
    t = re.sub(r'(--%s:)#[0-9A-Fa-f]{3,6}' % re.escape(var), r'\g<1>' + val, t, count=1)
if '__YS__' in t:
    fu = cfg.get('fuentes', os.path.join(AQUI, 'fuentes'))
    ys = base64.b64encode(open(os.path.join(fu, 'young-serif-latin-400-normal.woff2'), 'rb').read()).decode()
    dm = base64.b64encode(open(os.path.join(fu, 'dm-sans-latin-wght-normal.woff2'), 'rb').read()).decode()
    t = t.replace('__YS__', ys).replace('__DMS__', dm)
salida = os.path.join(cfg.get('salida', os.path.join(AQUI, 'salida')), slug + '.html')
os.makedirs(os.path.dirname(salida), exist_ok=True)
open(salida, 'w', encoding='utf-8').write(t)
print('OK', salida, len(t)//1024, 'KB ·', reales, 'reales +', inv, 'inventadas')
