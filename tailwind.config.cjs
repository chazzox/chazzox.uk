/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        githubOne: "rgb(4 13 33)",
        githubTwo: "rgb(58 61 160)",
        spotifyOne: "rgb(29 185 84)",
        spotifyTwo: "rgb(24 24 24)",
        redditOne: "rgb(255 76 2)",
        redditTwo: "rgb(237 10 33)",
        twitterOne: "rgb(85 172 239)",
        twitterTwo: "rgb(10 118 231)",
        discordOne: "rgb(114 137 218)",
        discordTwo: "rgb(33 53 125)",
        linkedinOne: "rgb(0 119 181)",
        linkedinTwo: "rgb(0 160 220)"
      },
      backgroundImage: {
        "main-img": 'url("/bg.webp")',
        "main-img2": 'url("/new.webp")'
      },
      fontFamily: { sans: ["Fira Code", "monospace"] }
    }
  },
  plugins: []
};
