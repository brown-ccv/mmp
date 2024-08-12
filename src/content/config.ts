import { defineCollection, z } from "astro:content"

export type Classification = "Book" | "Article" | "Dissertation" | "Chapter"

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
    version: z.string().optional(),
    cat: z.string(),
    codebookType: z.string().optional(),
    file: z.string().optional(),
    archivo: z.string().optional(),
  }),
})

const publications = defineCollection({
  type: "content",
  schema: z.object({
    classification: z.custom<Classification>(),
    author: z.string(),
    pubDate: z.coerce.date(),
    citation: z.string(),
    feature: z.boolean(),
    image: z.string().optional(),
    pdf: z.string().optional(),
    url: z.string().optional(),
  }),
})

const people = defineCollection({
  type: "content",
  schema: z.object({
    type: z.string(),
    name: z.string(),
    link: z.string().optional(),
    title: z.string(),
    avatar: z.string().optional(),
    institution: z.string(),
    bio: z.string(),
  }),
})

const map = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
  }),
})
export const collections = {
  news: news,
  data: files,
  people: people,
  publications: publications,
  map: map,
}
