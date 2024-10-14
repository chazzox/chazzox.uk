import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import { default as rehypeKatex } from "rehype-katex";
import { default as remarkMath } from "remark-math";
import remarkMermaid from "remark-mermaidjs";

export default defineConfig({
    integrations: [svelte(), tailwind(), mdx()],
    output: "static",
    server: {
        port: 3000
    },
    markdown: {
        remarkPlugins: [
            [remarkMermaid, { mermaidConfig: { theme: "neutral" } }],
            remarkMath
        ],
        rehypePlugins: [rehypeKatex]
    },
    devToolbar: {
        enabled: false
    },
    prefetch: true
});
