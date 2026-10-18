# Web de Kova

Web de la agencia hecha con **Astro** y **TinaCMS**. El diseño viene del prototipo de Lovable (rama `main` de este repositorio); esta rama contiene la web definitiva, con todos los textos e imágenes editables desde Tina.

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

Y abre en el navegador:

- **La web:** <http://localhost:4321>
- **El editor (Tina):** <http://localhost:4321/admin>

Para pararla, vuelve a la terminal y pulsa `Ctrl + C`.

## Cómo se edita

En `/admin` pulsa **Enter Edit Mode**. Verás la web a la derecha y los campos a la izquierda. Haz clic en cualquier texto o imagen de la web para ir a su campo; los cambios se ven al momento y se guardan con **Save**.

En local, Tina guarda los cambios directamente en los archivos del proyecto:

- `src/content/home/index.json`: todos los textos de la página de inicio.
- `src/content/config/settings.json`: datos de la empresa (teléfono, WhatsApp, email, menú…).
- `public/uploads/`: las imágenes que se suben desde el editor.

Después de editar, guarda los cambios en GitHub con `git add`, `git commit` y `git push`.

## Contenido pendiente

Está marcado entre corchetes para rellenarlo desde el editor:

- `[PRECIO]` en la portada, la banda de precio y las tres modalidades.
- `[TELÉFONO]`, `[WHATSAPP]` y `[EMAIL]` en «Datos de la empresa».
- Los cinco proyectos son ejemplos del prototipo (`[EJEMPLO]`): hay que sustituirlos por proyectos reales.
- Los enlaces legales (aviso legal, privacidad, cookies) aún no llevan a ninguna página.
- Los formularios todavía no envían nada; falta conectarlos a un servicio de formularios.

## Estructura

```
src/
  components/sections/   una sección de la web por archivo
  components/            cabecera, pie, logo y botones
  content/               el contenido que edita Tina
  layouts/Base.astro     estructura común y animaciones
  styles/global.css      colores (los del logo), tipografía y animaciones
tina/collections/        qué campos aparecen en el editor y cómo se llaman
public/                  logo, favicon e imágenes
```

## Publicar (más adelante)

1. Crear un proyecto en [Tina Cloud](https://app.tina.io) conectado a este repositorio y rama.
2. Crear un proyecto en Cloudflare Pages conectado al repositorio, con el comando `npm run build`, la carpeta `dist` y las variables de `.env.example`.
3. Conectar el dominio `kovaservice.es`.
