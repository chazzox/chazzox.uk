import { defineCollection, reference, z } from "astro:content";

const authorSchema = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        social: z
            .object({
                twitter: z.string().url(),
                github: z.string().url()
            })
            .partial()
            .refine((data) => data.twitter || data.github)
    })
});

const categorySchema = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        link: z.string().url().optional()
    })
});

const blogSchema = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: reference("authors"),
        category: reference("categories"),
        date: z.date(),
        released: z.boolean()
    })
});

export const collections = {
    blogs: blogSchema,
    authors: authorSchema,
    categories: categorySchema
};
