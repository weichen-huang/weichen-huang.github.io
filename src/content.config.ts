import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      /** Post title */
      title: z.string().max(80),
      /** Short summary shown in lists and meta description */
      description: z.string().max(200),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Post language tag, e.g. '中文' / 'English'. Kept in data for
       *  display in the meta row, RSS or filtering. Optional — posts
       *  without it just have no language label. */
      language: z.string().optional(),
      /** Optional cover image — a local asset referenced relative to this file,
       *  e.g. `src: ../../assets/cover.png`. Optimized by the Astro image
       *  service (sharp) with responsive sizes. */
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional()
        })
        .optional(),
      /** Hidden from lists but still accessible by URL */
      draft: z.boolean().default(false),
      demo: z.boolean().default(false),
      kind: z.enum(['essay', 'activity']).default('essay'),
      legacyPath: z.string().optional(),
      /** Per-post comment toggle */
      comment: z.boolean().default(true)
    })
})

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    comment: z.boolean().default(false),
    legacyPath: z.string()
  })
})

export const collections = { blog, projects }
