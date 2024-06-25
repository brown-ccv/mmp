import { defineCollection, z } from "astro:content"

const news = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
})

const files = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    cat: z.string(),
    file: z.string(),
  }),
})

const publications = defineCollection({
  type: "content",
  schema: z.object({
    classification: z.string(),
    pubDate: z.coerce.date(),
    citation: z.string(),
    pdf: z.string().optional(),
    url: z.string().optional(),
  }),
})
export const collections = { news: news, data: files, publications: publications }
