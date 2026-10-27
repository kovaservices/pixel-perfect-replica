// Quita el editor de Tina (/admin) de la web publicada. La web se edita en
// local con `npm run dev`, así que en producción /admin no debe existir:
// quien entre ahí verá la página 404. Lo usa `npm run build`.
import { rm } from 'node:fs/promises';

await rm('dist/client/admin', { recursive: true, force: true });
console.log('Editor de Tina (/admin) quitado de la web publicada.');
