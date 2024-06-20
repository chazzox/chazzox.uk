import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import { default as rehypeKatex } from "rehype-katex";
import { default as remarkMath } from "remark-math";
import remarkMermaid from "astro-diagram/remark-mermaid";

export default defineConfig({
    integrations: [svelte(), tailwind(), mdx()],
    output: "hybrid",
    server: {
        port: 3000
    },
    adapter: vercel({
        analytics: true
    }),
    markdown: {
        remarkPlugins: [remarkMermaid, remarkMath],
        rehypePlugins: [rehypeKatex]
    },
    devToolbar: {
        enabled: false
    },
    prefetch: true
});
