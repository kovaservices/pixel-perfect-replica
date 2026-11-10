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

- `npm run dev`: la web en local en http://localhost:4321.
- `npm run build`: compilación de producción (la usa Cloudflare).
- `npm run build:local`: lo mismo; se mantiene porque lo usan los flujos de GitHub y los socios.

Después de cualquier cambio, comprueba que `npm run build:local` termina sin errores.

## Tecnología

- Astro 6 con salida estática; el adaptador es Cloudflare si existe `CF_PAGES`, `WORKERS_CI` o `DEPLOY_ADAPTER=cloudflare`, y Node en el resto de casos. Solo `/api/contacto` es dinámica.
- Se publica en Cloudflare Workers (no Pages: el adaptador de Astro 6 ya no lo admite) con el dominio `https://kovaservices.es`, que es el `site` por defecto. `wrangler.jsonc` mantiene `nodejs_compat` para la función del formulario.
- Tailwind v4 con `@tailwindcss/vite`. Los colores están en `src/styles/global.css`: coral `#F07458`, coral oscuro `#B9452A` para texto sobre fondo claro, amarillo `#F0BA58` y fondo oscuro `#05031C`. Usa los tokens, no colores sueltos.
- Sin CMS: la web de Kova no usa TinaCMS ni ningún editor visual (decisión de los socios, noviembre de 2026). Los textos viven en `src/content/` (JSON para portada y datos de la empresa, Markdown para los legales) y se leen en `src/lib/data.ts` y en la colección `legal` de `src/content.config.ts`. Los textos nuevos van en esos archivos, no escritos a mano en los componentes.
- Iconos con astro-icon (`lucide` y `ri`). Un icono nuevo hay que añadirlo a la lista `include` de `astro.config.mjs`.
- Tipografía Plus Jakarta Sans incluida con `@fontsource-variable`. Nada de Google Fonts.
- Formularios: se envían por fetch a `src/pages/api/contacto.ts`, que los reenvía a Forminit (`FORMINIT_FORM_ID`). Sin ese ID, en local responden en modo de prueba.
- Sin cookies ni scripts de terceros. Si se añade algo que use cookies, hay que actualizar `src/content/legal/cookies.md` y poner aviso. La analítica prevista es Cloudflare Web Analytics.
- Las interacciones de `src/layouts/Base.astro` usan delegación de eventos.

## Estructura

```
src/content/home/index.json      textos de la página de inicio
src/content/config/settings.json datos de la empresa, menú y redes
src/content/legal/*.md           aviso legal, privacidad y cookies
src/content/servicios/*.json     una página por servicio (el nombre del archivo es la dirección)
src/content/proyectos/*.json     casos de clientes en /proyectos/<archivo>
src/components/sections/         una sección por archivo
src/layouts/Base.astro           meta, JSON-LD, script de la página
src/lib/schema.ts                ayudas para los datos estructurados de cada página
src/pages/llms.txt.ts            /llms.txt para los asistentes de IA, generado con los textos
public/                          logo, favicon, og-kova.png, uploads/
```

## SEO, GEO y AEO

- Cada página lleva título, descripción y canónica propios, y JSON-LD en `@graph`: la empresa (`#kova`, con `areaServed` España) y la web en todas; FAQPage, Service, BreadcrumbList u OfferCatalog según la página.
- Los legales llevan `noindex` y están fuera del sitemap.
- Las reseñas de clientes solo se publican si son reales (campo `review` de cada proyecto). No uses datos estructurados de reseñas sobre la propia Kova.
- Un dato pendiente como `[TELÉFONO]` no se muestra (`isFilled` en `src/lib/data.ts`).

## Contenido pendiente

Los valores entre corchetes (`[PRECIO]`, `[TELÉFONO]`, `[EJEMPLO]`…) son marcadores que rellenan los socios. No los sustituyas por datos inventados.
