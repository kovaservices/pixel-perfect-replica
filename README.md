# Web de Kova

Web de la agencia hecha con **Astro**. El diseño viene del prototipo de Lovable (rama `main` de este repositorio); esta rama contiene la web definitiva.

## Arrancar la web en tu ordenador

Necesitas tener instalado:

- **Node.js** versión LTS, 22.22 o superior: <https://nodejs.org>
- **Git**: <https://git-scm.com>

Abre una terminal (en Windows, «Terminal» o «PowerShell») y ejecuta, una sola vez:

```sh
git clone -b web-astro https://github.com/kovaservices/pixel-perfect-replica.git kova-web
cd kova-web
npm install
```

Después, cada vez que quieras trabajar en la web:

```sh
npm run dev
```

Y abre en el navegador <http://localhost:4321>.

Para pararla, vuelve a la terminal y pulsa `Ctrl + C`.

### Atajos para Windows

En la carpeta del proyecto hay dos scripts que se abren con doble clic:

- **`iniciar.bat`**: arranca la web y abre el navegador en cuanto está lista. Si ya estaba en marcha, solo abre el navegador. La primera vez instala lo necesario.
- **`actualizar.bat`**: descarga de GitHub los últimos cambios. Si en tu ordenador hay cambios que aún no están en GitHub (por ejemplo, textos que has cambiado), te pregunta si quieres guardarlos y subirlos antes de actualizar. Si hay dependencias nuevas, las instala.

Después de actualizar, si la web estaba abierta, ciérrala con `Ctrl + C` y vuelve a abrirla con `iniciar.bat`.

## Cómo se edita

Los textos están en archivos del proyecto y se cambian directamente en ellos (con cualquier editor de texto, como VS Code, o desde la web de GitHub):

- `src/content/home/index.json`: todos los textos de la página de inicio, el título y la descripción para Google.
- `src/content/config/settings.json`: datos de la empresa (teléfono, WhatsApp, email, menú…).
- `src/content/legal/`: aviso legal, privacidad y cookies, en Markdown.
- `src/content/servicios/`: una página por servicio (`paginas-web.json` es `/paginas-web/`).
- `src/content/proyectos/`: casos de clientes. Cuando llegue la reseña de un cliente, se pega en `review` (texto, nombre, cargo y enlace) y aparece sola en su página.
- `public/uploads/`: las imágenes.

Con la web en marcha (`npm run dev` o `iniciar.bat`), los cambios se ven al momento al guardar el archivo. Después, súbelos a GitHub con `git add`, `git commit` y `git push` (o con `actualizar.bat`). Cloudflare vuelve a publicar la web sola en un par de minutos.

## Contenido pendiente

Está marcado entre corchetes para rellenarlo en los archivos de contenido:

- `[PRECIO]` en la portada, la banda de precio y las tres modalidades.
- `[TELÉFONO]`, `[WHATSAPP]`, `[EMAIL]`, `[INSTAGRAM]`, `[LINKEDIN]` y `[TIKTOK]` en `settings.json`.
- La reseña de ALFISA Instalaciones: el hueco está en `src/content/proyectos/alfisa-instalaciones.json` y no se muestra mientras esté vacío.
- En los textos legales (`src/content/legal/`): `[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]`, `[NIF]`, `[DIRECCIÓN COMPLETA]`, `[EMAIL]`, `[TELÉFONO]` y `[FECHA]`. Son plantillas: conviene que las revise un profesional antes de publicar.

## Redes sociales e imagen para compartir

En `settings.json`, en `social`, se ponen los enlaces de Instagram, LinkedIn y TikTok. Los iconos salen en el contacto y en el pie; si un campo se deja vacío, esa red no aparece. Son enlaces normales: no cargan nada de las redes ni instalan cookies.

La imagen que aparece al compartir la web (WhatsApp, LinkedIn…) está en `public/og-kova.png` y se indica en `seo.image` de `index.json`. La web también incluye datos estructurados para que Google la reconozca como negocio local.

## Páginas legales

Están en `/legal/aviso-legal`, `/legal/privacidad` y `/legal/cookies`, enlazadas desde el pie y desde los formularios. Se editan en `src/content/legal/`. La web no usa cookies ni carga nada de servicios externos (la tipografía va incluida), así que no necesita aviso de cookies. Si algún día se añade analítica, hay que actualizar la política y poner el aviso.

## Formularios (Forminit)

Los tres formularios (portada, banda de precio y contacto) envían los mensajes a la ruta `/api/contacto` de la propia web, que los reenvía a [Forminit](https://forminit.com). Forminit guarda los mensajes en servidores de la Unión Europea (Irlanda), avisa por email y tiene un plan gratuito de 100 envíos al mes.

Para activarlos:

1. Crea una cuenta gratuita en Forminit y crea un formulario.
2. En la configuración del formulario, activa los avisos por email al correo de Kova.
3. Copia `.env.example` como `.env` y pon el identificador del formulario en `FORMINIT_FORM_ID`.
4. Reinicia `npm run dev` y envía un mensaje de prueba.

Mientras `FORMINIT_FORM_ID` esté vacío, en local los mensajes no se envían: aparecen en la terminal y la web muestra «Mensaje de prueba recibido». Al publicar, la misma variable se añade en la configuración del proyecto en Cloudflare.

Los formularios tienen un campo trampa oculto contra bots y piden al menos un email o un teléfono. El de contacto obliga a aceptar la política de privacidad.

## Estructura

```
src/
  components/sections/   una sección de la web por archivo
  components/            cabecera, pie, logo y botones
  content/               textos de la web (JSON y Markdown)
  layouts/Base.astro     estructura común y animaciones
  styles/global.css      colores (los del logo), tipografía y animaciones
public/                  logo, favicon e imágenes
```

## Publicar en Cloudflare

La web se publica en **Cloudflare Workers** (el sucesor de Cloudflare Pages: Astro 6 ya no admite Pages) con el dominio `kovaservices.es`. La configuración está en `wrangler.jsonc` y el dominio por defecto en `astro.config.mjs` (se puede cambiar con la variable `SITE_URL`).

En Cloudflare, en **Workers y Pages → Crear → Importar un repositorio**, se conecta este repositorio con:

- **Rama de producción:** `web-astro`
- **Comando de compilación:** `npm run build`
- **Comando de implementación:** `npx wrangler deploy`
- **Variables:** `FORMINIT_FORM_ID` (y `FORMINIT_API_KEY` si se usa) y `NODE_VERSION` = `22.22.0`.

Los pasos completos (dominio, DNS y correo) están en la guía para los socios.
