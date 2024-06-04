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
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
})

const history = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(),
    interviewee: z.string().optional(),
    year: z.string().optional(),
    lede: z.string().optional(),
    story: z.string(),
  }),
})
export const collections = { news: news, data: files, people: people, history: history }
