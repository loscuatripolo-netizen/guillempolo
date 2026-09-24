# Demo de agente de reseñas (plantilla Zelai Txiki)

Para cada restaurante nuevo:

1. Copiar `zelai.json` a `<slug>.json` y cambiar: slug, negocio, para, nota, total, cifra3/cifra3txt,
   iniciales, movil_queja/movil_resp/movil_cambio, regla_platos, firma, firma_corta, precios y las 10 reseñas.
2. Reseñas: 8-9 reales de Google (nombre como sale, «Google · hace X») y 1-2 que van a ella
   (estado "esp" con motivo). Si no hay negativa real, una inventada con "inventada": true.
3. `python3 gen_resenas.py <slug>.json` → `salida/<slug>.html`
4. `node og_resenas.mjs salida/<slug>.html` (desde /opt/node-tools) → captura OG + comprobación móvil y axe.
   Convertir la PNG a JPG: `salida/<slug>-og.jpg`.
5. Subir `<slug>.html` y `<slug>-og.jpg` a `demos/` del repo. Queda en guillempolo.vercel.app/demos/<slug>.

Colores opcionales: "colores": {"verde":"#1F3A2C","verde-2":"#2E5A43","oro":"#C9962B"}.
Si no está la plantilla, vale cualquier demo publicada como plantilla: "plantilla": "ruta/a/zelai-txiki-resenas.html".
