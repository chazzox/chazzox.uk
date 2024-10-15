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

export const noteSchema = z.object({
    title: z.string(),
    description: z.string(),
    author: reference("authors"),
    tags: z.array(reference("tags")).optional(),
    date: z.date(),
    released: z.boolean(),
    archived: z.boolean().optional().default(false)
});

const noteCollection = defineCollection({
    type: "content",
    schema: noteSchema
});

const tagSchema = defineCollection({
    type: "data",
    schema: z.object({
        id: z.string()
    })
});

export const collections = {
    notes: noteCollection,
    authors: authorSchema,
    tags: tagSchema
};
