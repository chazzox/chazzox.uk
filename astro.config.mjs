import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/static";

export default defineConfig({
  integrations: [svelte(), tailwind()],
  output: "static",
  server: { port: 3000 },
  adapter: vercel({
    analytics: false
  })
});
