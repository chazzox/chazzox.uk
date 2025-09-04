import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const authors = defineCollection({
    loader: glob({ pattern: "src/content/authors/*.json" }),
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

const notes = defineCollection({
    loader: glob({ pattern: "src/content/notes/**/*.md" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: reference("authors"),
        tags: z.array(reference("tags")).optional(),
        date: z.date(),
        released: z.boolean(),
        archived: z.boolean().optional().default(false)
    })
});

const tags = defineCollection({
    loader: glob({ pattern: "src/content/tags/*.json" }),
    schema: z.object({
        id: z.string()
    })
});

const records = defineCollection({
    loader: glob({ pattern: "src/content/records/*/data.json" }),
    schema: ({ image }) =>
        z.object({
            artist: z.string(),
            rating: z.number(),
            album: z.string(),
            description: z.string().optional(),
            file: image(),
            tags: z.array(reference("recordTags")).optional()
        })
});

export const collections = {
    notes,
    authors,
    tags,
    records
};
