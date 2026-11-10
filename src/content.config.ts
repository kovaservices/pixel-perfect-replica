/**
 * Textos legales: un Markdown por página en src/content/legal/.
 * El resto del contenido (portada y datos de la empresa) son JSON que se
 * importan directamente desde src/lib/data.ts.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
	loader: glob({ pattern: '**/*.md', base: 'src/content/legal' }),
	schema: z.object({ title: z.string(), updated: z.string().optional() }),
});

export const collections = { legal };
