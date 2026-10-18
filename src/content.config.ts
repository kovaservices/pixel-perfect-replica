/**
 * El contenido se lee a través de Tina (ver src/lib/data.ts), no de las
 * colecciones de Astro. Se declaran solo para que Astro no intente leer
 * estos JSON como Markdown y muestre avisos.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const home = defineCollection({ loader: glob({ pattern: '**/*.json', base: 'src/content/home' }) });
const config = defineCollection({ loader: glob({ pattern: '**/*.json', base: 'src/content/config' }) });

const legal = defineCollection({ loader: glob({ pattern: '**/*.md', base: 'src/content/legal' }) });

export const collections = { home, config, legal };
