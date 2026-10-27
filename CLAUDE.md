# CLAUDE.md — Web de Kova

Instrucciones para Claude cuando trabaje en este repositorio. Responde siempre en español.

## Qué es esto

La web de Kova, una empresa de soluciones digitales a medida (webs, automatizaciones, aplicaciones y software). Eslogan: «Soluciones digitales a medida para tu negocio». No escribas textos que hagan parecer a Kova una empresa que está empezando, no uses como gancho principal que el cliente puede editar la web, y no menciones Ciudad Real en el título, la descripción SEO ni el eslogan (sí en «Somos de aquí», el pie y el JSON-LD).

## Ramas y Git

- `main` es el prototipo de Lovable. No se toca.
- `web-astro` es la web definitiva. Todo el trabajo va aquí.
- No reescribas el historial ni hagas force push.
- Los socios trabajan en Windows con `actualizar.bat` (sincroniza con GitHub) e `iniciar.bat` (arranca la web). Los cambios se suben a GitHub y ellos los descargan con `actualizar.bat`; no copies archivos directamente a sus ordenadores.
- `.gitattributes` fuerza LF en todo salvo en los `.bat` (CRLF). Respétalo.

## Comandos

- `npm run dev`: Tina + Astro en local. Web en http://localhost:4321 y editor en http://localhost:4321/admin.
- `npm run build:local`: compila sin Tina Cloud (para comprobar que todo funciona).
- `npm run build`: compilación de producción con Tina Cloud (necesita `PUBLIC_TINA_CLIENT_ID` y `TINA_TOKEN`). En la web publicada, `/admin` pide iniciar sesión en Tina Cloud y solo hay una cuenta con acceso; no añadas usuarios ni otras formas de entrar.
- `npm run build:sin-admin`: `build:local` sin `/admin`. Lo usa la vista previa de GitHub Pages.

Después de cualquier cambio, comprueba que `npm run build:local` termina sin errores.

## Tecnología

- Astro 6 con salida estática; el adaptador es Cloudflare si existe `CF_PAGES`, `WORKERS_CI` o `DEPLOY_ADAPTER=cloudflare`, y Node en el resto de casos. Solo `/tina-island/*` y `/api/contacto` son dinámicas.
- Se publica en Cloudflare Workers (no Pages: el adaptador de Astro 6 ya no lo admite) con el dominio `https://kovaservices.es`, que es el `site` por defecto. `wrangler.jsonc` necesita `nodejs_compat` porque Tina usa `node:async_hooks`. El plan gratuito de Workers admite hasta 3 MB comprimidos de código de servidor; ahora ocupa unos 2,6 MB.
- Tailwind v4 con `@tailwindcss/vite`. Los colores están en `src/styles/global.css`: coral `#F07458`, coral oscuro `#B9452A` para texto sobre fondo claro, amarillo `#F0BA58` y fondo oscuro `#05031C`. Usa los tokens, no colores sueltos.
- TinaCMS 3 con `@tinacms/astro`: edición visual sin React, mediante `TinaIsland`, `tinaField` y `data-tina-field`. Cualquier texto o imagen nuevo debe ser editable: añade el campo en `tina/collections/*.ts`, el contenido en `src/content/` y el `data-tina-field` en el componente.
- Las etiquetas de Tina están en español y numeradas como las secciones de la web («1 · Portada», «2 · Servicios»…), porque son lo que ve el cliente.
- Iconos con astro-icon (`lucide` y `ri`). Un icono nuevo hay que añadirlo a la lista `include` de `astro.config.mjs`.
- Tipografía Plus Jakarta Sans incluida con `@fontsource-variable`. Nada de Google Fonts.
- Formularios: se envían por fetch a `src/pages/api/contacto.ts`, que los reenvía a Forminit (`FORMINIT_FORM_ID`). Sin ese ID, en local responden en modo de prueba.
- Sin cookies ni scripts de terceros. Si se añade algo que use cookies, hay que actualizar `src/content/legal/cookies.md` y poner aviso. La analítica prevista es Cloudflare Web Analytics.
- Las interacciones de `src/layouts/Base.astro` usan delegación de eventos y un MutationObserver porque Tina vuelve a pintar zonas al editar. Mantén ese patrón.

## Estructura

```
src/content/home/index.json      textos de la página de inicio
src/content/config/settings.json datos de la empresa, menú y redes
src/content/legal/*.md           aviso legal, privacidad y cookies
src/components/sections/         una sección por archivo
src/layouts/Base.astro           meta, JSON-LD, script de la página
tina/collections/                campos del editor
public/                          logo, favicon, og-kova.png, uploads/
```

## Contenido pendiente

Los valores entre corchetes (`[PRECIO]`, `[TELÉFONO]`, `[EJEMPLO]`…) son marcadores que rellenan los socios desde Tina. No los sustituyas por datos inventados.
