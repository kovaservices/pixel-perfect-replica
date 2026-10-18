/**
 * Ruta que usa el editor visual de Tina para volver a pintar una zona
 * de la web mientras el cliente escribe. Las zonas están en src/lib/islands.ts.
 */
import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/islands';

export const prerender = false;
export const ALL: APIRoute = experimental_createIslandRoute(islands);
