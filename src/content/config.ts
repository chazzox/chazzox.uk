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

const folderSchema = defineCollection({
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
        folder: reference("folders"),
        tags: z.array(reference("tags")).optional(),
        date: z.date(),
        released: z.boolean(),
        archived: z.boolean().optional().default(false)
    })
});

const tagSchema = defineCollection({
    type: "data",
    schema: z.object({
        id: z.string()
    })
});

export const collections = {
    blogs: blogSchema,
    authors: authorSchema,
    folders: folderSchema,
    tags: tagSchema
};
