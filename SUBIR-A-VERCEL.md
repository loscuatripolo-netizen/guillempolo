# Cómo subir esta web a Vercel

Tiempo: unos 15 minutos la primera vez. No hay que instalar nada.

---

## Paso 1 · Crear el repositorio en GitHub

1. Entra en **github.com** y crea una cuenta si no la tienes.
2. Arriba a la derecha, el botón **+** → **New repository**.
3. Rellena así:
   - **Repository name:** `guillempolo`
   - **Public** o **Private**, da igual: Vercel funciona con las dos.
   - **No marques** «Add a README file» ni ninguna otra casilla.
4. **Create repository**.

## Paso 2 · Subir los archivos

En la pantalla que sale después, pulsa el enlace **uploading an existing file**.

Abre esta carpeta (`sitio-guillem`), **selecciona todo lo que hay dentro** (Ctrl+E para
seleccionar todo) y arrástralo a la ventana de GitHub. Importante: se arrastra **el contenido**
de la carpeta, no la carpeta.

Tiene que subir 27 archivos, incluida la carpeta `fuentes`. Cuando terminen de subirse,
abajo pulsa **Commit changes**.

## Paso 3 · Conectar Vercel

1. Entra en **vercel.com** y regístrate **con tu cuenta de GitHub** (botón *Continue with GitHub*).
   Así se conectan solas las dos cosas.
2. En el panel, **Add New…** → **Project**.
3. Te saldrá la lista de tus repositorios. Busca `guillempolo` y pulsa **Import**.
4. **Muy importante:** en la casilla **Project Name** escribe exactamente `guillempolo`.
   De eso depende que la dirección sea `guillempolo.vercel.app`, que es la que ya está
   configurada dentro de la web.
5. No toques nada más. *Framework Preset* debe quedarse en **Other** y los campos de
   compilación, vacíos: esto son archivos HTML, no hay nada que compilar.
6. **Deploy**.

En menos de un minuto tienes la web en `https://guillempolo.vercel.app`.

## Paso 4 · Comprobar que todo está bien

Abre la web y repasa esto:

- [ ] La portada carga y el titular entra letra a letra
- [ ] Los enlaces del menú llevan a las cuatro páginas de servicio
- [ ] En **Facturas**, el panel de gastos responde al cambiar el mes y la métrica
- [ ] `guillempolo.vercel.app/una-pagina-que-no-existe` enseña la página 404
- [ ] Mándate el enlace por WhatsApp y comprueba que sale la tarjeta con imagen
- [ ] Ábrela en el móvil y mira que aparece el botón verde de llamar

## Paso 5 · Que Google la encuentre

1. Entra en **search.google.com/search-console**.
2. Añade una propiedad de tipo **Prefijo de URL** con `https://guillempolo.vercel.app`.
3. Verifícala con el método de **etiqueta HTML**: te dará una línea `<meta name="google-site-verification" ...>`.
   Pásamela y te digo dónde ponerla, o pégala tú justo debajo de `<meta charset="utf-8">` en `index.html`.
4. Una vez verificada, en **Sitemaps** escribe `sitemap.xml` y envíalo.

---

## Cuando compres el dominio de verdad

1. Cómpralo donde quieras (Namecheap, Porkbun, IONOS… unos 10-12 € al año el `.com`).
2. En Vercel: tu proyecto → **Settings** → **Domains** → escribe el dominio → **Add**.
3. Vercel te dirá qué registros DNS poner. Se copian tal cual donde compraste el dominio.
4. Avísame: hay que cambiar la dirección dentro del generador para que los enlaces canónicos,
   el sitemap y las tarjetas de compartir apunten al dominio nuevo y no al de Vercel.

## Para actualizarla más adelante

Cada vez que te mande archivos nuevos: GitHub → tu repositorio → **Add file** → **Upload files**,
arrastras los que cambien y **Commit changes**. Vercel lo publica solo en menos de un minuto.
