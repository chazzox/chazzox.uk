import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import { default as rehypeKatex } from "rehype-katex";
import { default as remarkMath } from "remark-math";
import remarkMermaid from "astro-diagram/remark-mermaid";

export default defineConfig({
    integrations: [svelte(), tailwind(), mdx(), prefetch()],
    output: "static",
    server: {
        port: 3000
    },
    adapter: vercel({
        analytics: false
    }),
    markdown: {
        remarkPlugins: [remarkMermaid, remarkMath],
        rehypePlugins: [rehypeKatex]
    },
    devToolbar: {
        enabled: false
    }
});
