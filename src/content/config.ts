import { defineCollection, reference, z, mer } from "astro:content";

type DateFormat = `${number}-${number}-${number}`; // 'YYYY-MM-DD'

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

const blogSchema = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: reference("authors"),
        date: z.date(),
        released: z.boolean()
    })
});

export const collections = {
    blogs: blogSchema,
    authors: authorSchema
};
