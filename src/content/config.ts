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

const people = defineCollection({
  type: "content",
  schema: z.object({
    type: z.string(),
    name: z.string(),
    title: z.string(),
    avatar: z.string().optional(),
    institution: z.string(),
  }),
})
export const collections = { news: news, data: files, people: people }
