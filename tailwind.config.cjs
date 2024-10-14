/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["selector", '[data-theme="dark"]'],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            borderWidth: {
                1: "1px"
            },
            colors: {
                "content-background": "#121317"
            },
            fontFamily: { sans: ["Fira Code", "monospace"] }
        }
    },
    plugins: [require("@tailwindcss/typography")]
};
