import * as sveltePlugin from "prettier-plugin-svelte";
import * as astroPlugin from "prettier-plugin-astro";
import * as tailwindPlugin from "prettier-plugin-tailwindcss";

/**
 * @type {import('@types/prettier').Options}
 */
export default {
  useTabs: false,
  tabWidth: 4,
  singleQuote: false,
  trailingComma: "none",
  proseWrap: "always",
  printWidth: 85,
  plugins: [
    "prettier-plugin-svelte",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
};
