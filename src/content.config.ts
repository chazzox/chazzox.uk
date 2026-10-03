import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

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
    records
};
