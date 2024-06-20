 
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
    plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro", 'prettier-plugin-svelte'],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro"
            }
        },
        {
            files: "*.svelte",
            options: {
                parser: "svelte"
            }
        }
    ]
};
