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

export const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    author: reference("authors"),
    tags: z.array(reference("tags")).optional(),
    date: z.date(),
    released: z.boolean(),
    archived: z.boolean().optional().default(false)
});

const blogCollection = defineCollection({
    type: "content",
    schema: blogSchema
});

const tagSchema = defineCollection({
    type: "data",
    schema: z.object({
        id: z.string()
    })
});

const module_schema = z.object({
    name: z.string(),
    code: z.string(),
    url: z.string(),
    moodleURL: z.string(),
    description: z.string(),
    lectures: z.array(z.string())
});

const moduleInformation = defineCollection({
    schema: module_schema,
    type: "data"
});

export const collections = {
    blogs: blogCollection,
    authors: authorSchema,
    tags: tagSchema,
    moduleInformation
};
