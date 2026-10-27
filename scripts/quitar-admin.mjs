// Quita el editor de Tina (/admin) de una compilación sin Tina Cloud, donde
// /admin no podría guardar nada. Lo usa `npm run build:sin-admin` para la
// vista previa de GitHub Pages.
import { rm } from 'node:fs/promises';

await rm('dist/client/admin', { recursive: true, force: true });
console.log('Editor de Tina (/admin) quitado de dist/client.');
