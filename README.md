# Web de servicios · Guillem Polo

Sitio estático de seis páginas: la principal y una ficha por servicio, cada una con su demostración
funcionando. Sin dependencias, sin proceso de compilación y sin base de datos: son archivos HTML que
se sirven tal cual.

## Archivos

```
index.html                      página principal (servicios, precios, calculadora, FAQ, contacto)
paginas-web.html                servicio 01 · maqueta navegable antes/después
resenas-google.html             servicio 02 · consola de reseñas interactiva
facturas-a-datos.html           servicio 03 · Excel desordenado → panel con proyección
asistente-whatsapp.html         servicio 04 · chat de WhatsApp simulado
publicaciones-automaticas.html  servicio 05 · calendario editorial con tres tonos
404.html                        página de error
favicon.svg                     icono del sitio
og/*.png                        imágenes de vista previa (WhatsApp, LinkedIn, Twitter)
sitemap.xml, robots.txt         para Google
vercel.json                     URLs sin .html y caché de las imágenes
```

## Publicarlo (GitHub + Vercel)

**1. Repositorio.** Desde esta carpeta:

```bash
git init
git add .
git commit -m "Web de servicios"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/web-servicios.git
git push -u origin main
```

**2. Vercel.** Entra en vercel.com → *Add New…* → *Project* → importa el repositorio.
No hay que tocar nada en la configuración: framework *Other*, sin comando de build,
directorio raíz el de siempre. Pulsa *Deploy* y en un minuto está publicado.

**3. Dominio.** Vercel te da una dirección `algo.vercel.app`. Cuando compres el dominio
definitivo, añádelo en *Settings → Domains* y luego **busca y reemplaza en todos los archivos**
`https://guillempolo.vercel.app` por el dominio nuevo: aparece en las etiquetas `canonical`,
en las de vista previa (`og:`), en `sitemap.xml` y en `robots.txt`.

**4. Google.** En [Search Console](https://search.google.com/search-console) añade la propiedad
y envía `https://tudominio/sitemap.xml`. Es lo que hace que Google encuentre las seis páginas.

## Mantenimiento

- **Precios y textos:** están escritos directamente en el HTML de cada página. Busca la cifra
  (por ejemplo `190 €`) y cámbiala; recuerda que los precios aparecen en la tabla de `index.html`
  y en el bloque de planes de la ficha correspondiente.
- **Teléfono y correo:** aparecen como `688655465` y `guillempolo2008@gmail.com`. Un buscar y
  reemplazar en toda la carpeta los cambia todos.
- **Vista previa al compartir:** si cambias un titular, regenera la imagen de `og/` correspondiente
  o el enlace seguirá mostrando el texto antiguo en WhatsApp.
- Cada `git push` a `main` vuelve a publicar automáticamente.

## Detalles técnicos

- El formulario de contacto abre el programa de correo del visitante con el mensaje redactado
  (`mailto:`). No hay servidor ni base de datos, así que **no se guarda ningún dato** en la web.
- No hay cookies ni analítica: por eso no lleva banner de cookies. Si algún día añades Google
  Analytics, tendrás que poner el aviso.
- Las páginas se adaptan al tema claro u oscuro del dispositivo del visitante.
- Todo el movimiento respeta el ajuste de "reducir movimiento" del sistema.

## Pendiente antes de promocionarla en serio

Falta el **aviso legal** con los datos identificativos (nombre completo, NIF, domicilio a efectos
de notificaciones y correo de contacto) y la **política de privacidad**. La LSSI lo exige a quien
presta servicios por internet, y resulta raro venderlo a los clientes y no tenerlo uno mismo.
Son dos páginas cortas: con esos datos se redactan en cinco minutos.
